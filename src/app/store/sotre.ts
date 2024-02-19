import { create } from "zustand";

import { IUser } from "../interfaces/user.interface";
import { ITravel } from "../loged/driver/page";
import { ITravelDB } from "../interfaces/TravelDB.interface";

import { IProfile } from "../interfaces/profile.interface";
import { IUserProductFull } from "../interfaces/userProduct.interface";

interface UserState {
  user: IUser;
  travel: ITravel | null;
  fetchUser: (email: string) => Promise<void>;
  postTravel: (travel: ITravel) => Promise<boolean | undefined>;
  travels: ITravelDB[];
  products: IUserProductFull[];
  profile: IProfile | null;
  fetchTravels: (id: string) => Promise<void>;
  fetchUserProducts: (id: string) => Promise<void>;
}

export const useUserState = create<UserState>((set, get) => ({
  user: {
    _id: "",
    email: "",
    fullname: "",
    smsCode: "",
  },
  travel: null,
  travels: [],
  products: [],
  profile: null, // Inicializa el objeto de usuario
  fetchUser: async (email: string) => {
    //console.log("usuario", email);
    const localUser = localStorage.getItem("user");
    const localProfile = localStorage.getItem("profile");
    const parsedUser = JSON.parse(localUser!);
    const parsedProfile = JSON.parse(localProfile!);
    if (localUser && localProfile) {
      set({ user: parsedUser });
      set({ profile: parsedProfile });
    } else {
      try {
        const responseUser = await fetch(`/api/auth/myid/?email=${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const userData = await responseUser.json();
        //console.log(userData);
        if (userData) {
          set({ user: userData });
          localStorage.setItem("user", JSON.stringify(userData));
          try {
            const responseProfile = await fetch(
              `/api/auth/getProfileById/?id=${userData._id}`
            ).then((response) => response.json());

            responseProfile && set({ profile: responseProfile });

            localStorage.setItem("profile", JSON.stringify(responseProfile));
          } catch (error) {
            console.error(error);
          }
          //console.log("usuario encontrado", userData);

          // profile && set({ profile: profile });
          // console.log(profile);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  },
  postTravel: async (travel: ITravel) => {
    //console.log("travel store", travel);
    set({ travel: travel });
    try {
      const response = await fetch("/api/auth/viajes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(travel),
      });
      //console.log(response);
      return response.ok;
    } catch (error) {
      console.error(error);
    }
  },
  fetchTravels: async (id: string) => {
    try {
      const response = await fetch(`/api/auth/getAllTravelsById/?id=${id}`);
      const newTravels = await response.json();

      //console.log("viajes", newTravels);
      set({ travels: newTravels });
    } catch (error) {
      console.error(error);
    }
  },
  fetchUserProducts: async (id: string) => {
    //console.log(id);
    try {
      const response = await fetch(`/api/auth/getAllProductsById/?id=${id}`);
      // const response = await fetch(
      //   `/api/auth/getAllProductsById/?id=65a692f5c1e2747ff0aa6d9a`
      // );
      const newProducts = await response.json();

      //console.log("productos", newProducts);
      set({ products: newProducts });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useUserState;
