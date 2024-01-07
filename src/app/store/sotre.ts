import { create } from "zustand";

import { IUser } from "../interfaces/user.interface";

interface UserState {
  user: IUser;
  fetchUser: (email: string) => Promise<void>;
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
}));

export default useUserState;
