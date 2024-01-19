import { create } from "zustand";

import { IUser } from "../interfaces/user.interface";
import { ITravel } from "../loged/driver/page";
import { ITravelDB } from "../interfaces/TravelDB.interface";
import { IProductDB } from "../interfaces/productDB.interface";
import { IProfile } from "../interfaces/profile.interface";

interface UserState {
  user: IUser;
  travel: ITravel | null;
  fetchUser: (email: string) => Promise<void>;
  postTravel: (travel: ITravel) => Promise<boolean | undefined>;
  travels: ITravelDB[];
  products: IProductDB[];
  profile: IProfile | null;
  fetchTravels: (id: string) => Promise<void>;
}

export const useUserState = create<UserState>((set, get) => ({
  user: {
    _id: "",
    email: "",
    fullname: "",
  },
  travel: null,
  travels: [],
  products: [],
  profile: null, // Inicializa el objeto de usuario
  fetchUser: async (email: string) => {
    console.log("usuario", email);
    const localUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(localUser!);
    if (localUser) {
      set({ user: parsedUser });
    } else {
      try {
        const responseUser = await fetch(`/api/auth/myid/?email=${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const userData = await responseUser.json();
        console.log(userData);
        if (userData) {
          set({ user: userData });
          localStorage.setItem("user", JSON.stringify(userData));
          console.log("usuario encontrado", userData);

          // const responseProfile = await fetch(
          //   `/api/auth/getProfileById/?id=${userData._id}`,
          //   {
          //     method: "GET",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //   }
          // );
          // const profile = await responseProfile.json();

          // profile && set({ profile: profile });
          // console.log(profile);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  },
  postTravel: async (travel: ITravel) => {
    console.log("travel store", travel);
    set({ travel: travel });
    try {
      const response = await fetch("/api/auth/viajes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(travel),
      });
      console.log(response);
      return response.ok;
    } catch (error) {
      console.error(error);
    }
  },
  fetchTravels: async (id: string) => {
    get();
    try {
      const response = await fetch(`/api/auth/getAllTravelsById/?id=${id}`);
      const newTravels = await response.json();

      console.log("viajes", newTravels);
      set({ travels: newTravels });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useUserState;
