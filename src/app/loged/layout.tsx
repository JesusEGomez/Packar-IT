/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect } from "react";
import BottmBar from "../components/bottmBar";
import Sidebar from "../components/sideBar";
import { useSession } from "next-auth/react";
import useUserState from "../store/sotre";
import { useRouter } from "next/navigation";

function layout({ children }: React.PropsWithChildren) {
  const { data: session } = useSession();
  const { fetchUser } = useUserState((state) => state);
  const navigation = useRouter();
  useEffect(() => {
    if (session?.user?.email) {
      fetchUser(session?.user?.email);
    }
    !session && navigation.push("/onboarding");
  }, [session]);

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
