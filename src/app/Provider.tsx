"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import { createContext, useState } from "react";

export const SidebarContext = createContext({
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
  const pathName = usePathname();
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
