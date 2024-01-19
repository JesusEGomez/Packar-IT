/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect } from "react";
import BottmBar from "../components/bottmBar";
import Sidebar from "../components/sideBar";
import { useSession } from "next-auth/react";
import useUserState from "../store/sotre";

function layout({ children }: React.PropsWithChildren) {
  const { data: session } = useSession();
  const { fetchUser } = useUserState((state) => state);
  useEffect(() => {
    if (session?.user?.email) {
      fetchUser(session?.user?.email);
    }
  }, []);

  return (
    <div>
      <Sidebar />
      {children}
      <div className="absolute z-10  bottom-0">
        <BottmBar />
      </div>
    </div>
  );
}

export default layout;
