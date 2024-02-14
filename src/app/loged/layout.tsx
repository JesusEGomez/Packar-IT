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
import { pushNotification } from "../api/auth/addNotification/pushNotification";

function layout({ children }: React.PropsWithChildren) {
  const { data: session, status } = useSession();

  const { fetchUser, user } = useUserState((state) => state);
  const notificationChannelName = `notifications-${user._id}`;
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigation = useRouter();
  const [popUpPermission, setPopUpPermission] = useState<boolean>(true);
  const allowNotifications = () => {
    Notification.requestPermission();
    setPopUpPermission(false);
  };
  const closePopUp = () => {
    setPopUpPermission(false);
  };
  useEffect(() => {
    Notification.permission === "granted" && setPopUpPermission(false);
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
        pushNotification(message.data.content);
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
      {popUpPermission && (
        <div className="fixed top-0 z-10 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-200 p-4 rounded-xl">
            <div className="flex flex-col w-80 gap-y-3">
              <button
                onClick={closePopUp}
                className="bg-pink text-white w-fit rounded-full p-2 hover:opacity-60"
              >
                <IoMdCloseCircleOutline size={20} />
              </button>
              <h1 className="font-bold w-72 mx-auto text-center">
                Hola, ¿nos autorizas a enviarte notificaciones para mantenerte
                al día sobre tus envíos y viajes?
              </h1>
              <button
                className="bg-pink w-full text-white font-bold rounded-xl my-2 p-3 hover:opacity-75"
                onClick={allowNotifications}
              >
                Permitir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default layout;
