"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface sideBar {
  isOpen: boolean;
  sideBarControl: () => void;
}

export const SidebarContext = createContext<sideBar>({
  isOpen: false,
  sideBarControl: () => {},
});

function Providers({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const sideBarControl = () => {
    setIsOpen(isOpen!);
  };
  return (
    <SidebarContext.Provider value={{ isOpen, sideBarControl }}>
      <SessionProvider>{children}</SessionProvider>
    </SidebarContext.Provider>
  );
}

export default Providers;
