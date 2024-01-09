import { create } from "zustand";

import { IUser } from "../interfaces/user.interface";
import { ITravel } from "../loged/driver/page";

interface UserState {
  user: IUser;
  travel: ITravel;
  fetchUser: (email: string) => Promise<void>;
  postTravel: (travel: ITravel) => Promise<boolean | undefined>;
}

export const useUserState = create<UserState>((set) => ({
  user: {
    _id: "",
    email: "",
    fullname: "",
    profile: {
      _id: "",
      driverLicense: { backPhoto: "", frontPhoto: "" },
      idDocument: { backPhoto: "", frontPhoto: "", number: "", type: "" },
      city: "",
      phoneNumber: "",
    },
  },
  travel: {
    userId: "",
    desde: {
      calle: "",
      pais: "",
      ciudad: "",
    },
    hasta: {
      calle: "",
      pais: "",
      ciudad: "",
    },
    precio: [
      {
        quantity: 0,
        price: 0,
      },
      {
        quantity: 0,
        price: 0,
      },
      {
        quantity: 0,
        price: 0,
      },
    ],
    horaSalida: "",

    horaLlegada: "",

    cuando: undefined,

    eresFlexible: true,

    estado: false,
    envios: [],
  }, // Inicializa el objeto de usuario
  fetchUser: async (email: string) => {
    const localUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(localUser!);
    if (localUser) {
      set({ user: parsedUser });
    } else {
      try {
        const response = await fetch(`/api/auth/signup/${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const userData = await response.json();
        set({ user: userData });
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  },
  postTravel: async (travel: ITravel) => {
    set({ travel: travel });
    try {
      const response = await fetch("/api/auth/viajes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(travel),
      });
      return response.ok;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
}));

export default useUserState;
