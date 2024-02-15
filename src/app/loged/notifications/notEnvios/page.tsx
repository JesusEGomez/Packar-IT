"use client";
import CardNotification from "@/app/components/CardNotification";
import { INotification } from "@/app/interfaces/notifications.interface";
import useUserState from "@/app/store/sotre";

import { useEffect, useState } from "react";

const NotViajes = () => {
  const [notifications, setNotification] = useState<INotification[] | null>();
  const { user } = useUserState((state) => state);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `/api/auth/addNotification/?id=${user._id}&type=usuario._id`
      );
      const newNotifications: INotification[] = await response.json();
      console.log(newNotifications);
      if (response.ok && newNotifications) {
        setNotification(newNotifications);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="w-full flex  flex-col overflow-auto gap-2 justify-center items-center">
      {notifications ? (
        <>
          {notifications.reverse().map((n) => {
            return (
              <>
                {n.vistoUser ? (<>No tienes nuevas Notificaciones</>) : (
                  <CardNotification
                    id={n._id}
                    name={n.usuario?.fullname!}
                    type={n.type!}
                    visto={n.vistoUser!}
                    detail="notEnvios"
                  />
                )}
              </>
            );
          })}
        </>
      ) : (
        <div>No tienes Notificaciones</div>
      )}
    </div>
  );
};

export default NotViajes;
