/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "../components/sideBar";

function layout({ children }: React.PropsWithChildren) {
  const navigation = useRouter();
  const { data: session } = useSession();
  console.log(session);
  useEffect(() => {
    if (session) {
      navigation.push("/loged");
    }
  });

  return <div>{children}</div>;
}

export default layout;
