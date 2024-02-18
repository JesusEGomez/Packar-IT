"use client";

import { SessionProvider } from "next-auth/react";

import { createContext, useState } from "react";
import { useRouter } from "next/navigation";

export interface ISidebarContext {
  isOpen: boolean;
  sideBarControl: () => void;
  closeSideBar: (direction: string) => void;
}

export const SidebarContext = createContext<ISidebarContext>({
  isOpen: false,
  sideBarControl: () => {},
  closeSideBar: (direction: string) => {},
});

interface Props {
  readonly children: React.ReactNode; // Marking children as read-only
}

function Providers({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useRouter();
  const sideBarControl = () => {
    setIsOpen(!isOpen);
  };

  const closeSideBar = (direction: string) => {
    setIsOpen(false);
    navigate.push(direction);
  };
  return (
    <SessionProvider>
      <SidebarContext.Provider value={{ isOpen, sideBarControl, closeSideBar }}>
        {children}
      </SidebarContext.Provider>
    </SessionProvider>
  );
}

export default Providers;
