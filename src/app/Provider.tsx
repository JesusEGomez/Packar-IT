"use client";

import { SessionProvider } from "next-auth/react";

import { createContext, useState } from "react";

export interface ISidebarContext {
  isOpen: boolean;
  sideBarControl: () => void;
}

export const SidebarContext = createContext<ISidebarContext>({
  isOpen: false,
  sideBarControl: () => {},
});

interface Props {
  readonly children: React.ReactNode; // Marking children as read-only
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
