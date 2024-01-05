"use client";

import { SessionProvider, useSession } from "next-auth/react";

import React from "react";
import { createContext, useState } from "react";
import { IUser } from "./interfaces/user.interface";

export interface ISidebarContext {
  isOpen: boolean;
  sideBarControl: () => void;
}

export const SidebarContext = createContext<ISidebarContext>({
  isOpen: false,
  sideBarControl: () => {},
});

interface Props {
  children: React.ReactNode;
}
interface Props {
  children: React.ReactNode;
}

function Providers({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  console.log("provider", isOpen);

  const sideBarControl = () => {
    setIsOpen(!isOpen);
  };
  return (
    <SessionProvider>
      <SidebarContext.Provider value={{ isOpen, sideBarControl }}>
        {children}
      </SidebarContext.Provider>
    </SessionProvider>
  );
}

export default Providers;
