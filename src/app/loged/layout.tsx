/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect, useState } from "react";
import BottmBar from "../components/bottmBar";
import Sidebar from "../components/sideBar";
import { useSession } from "next-auth/react";
import useUserState from "../store/sotre";
import { useRouter } from "next/navigation";
import ably from "@/app/api/ably/ably";
import { IoMdCloseCircleOutline } from "react-icons/io";
// import { pushNotification } from "../api/auth/addNotification/pushNotification";

function layout({ children }: React.PropsWithChildren) {
  const { data: session } = useSession();
  const { status } = useSession();
  const { fetchUser, user } = useUserState((state) => state);
  const notificationChannelName = `notifications-${user._id}`;
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigation = useRouter();

  useEffect(() => {
    if (session?.user?.email) {
      fetchUser(session?.user?.email);
    }
    if (status === "unauthenticated") {
      navigation.push("/onboarding");
    }
    if (!isSubscribed) {
      const channel = ably.channels.get(notificationChannelName);
      channel.subscribe((message) => {
        alert(`Mensaje recibido: ${message.data.content}`);
        //pushNotification(message.data.content);
      });
      setIsSubscribed(true);
    }
  }, [navigation, status, notificationChannelName, isSubscribed]);

  return (
    <div>
      <Sidebar />
      {children}
      <div className="  bottom-0">
        <BottmBar />
      </div>
    </div>
  );
}

export default layout;
