/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect, useState } from "react";
import BottmBar from "../components/bottmBar";
import Sidebar from "../components/sideBar";
import { useSession } from "next-auth/react";
import useUserState from "../store/sotre";
import { useRouter } from "next/navigation";
import ably from "@/app/api/ably/ably";

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
    } else if (!isSubscribed) {
      // Suscribirse al canal de notificaciones solo si no hemos suscrito antes
      const channel = ably.channels.get(notificationChannelName);
      channel.subscribe((message) => {
        alert(`Mensaje recibido: ${message.data.content}`);
      });
      setIsSubscribed(true); // Marcar que ya nos hemos suscrito
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
