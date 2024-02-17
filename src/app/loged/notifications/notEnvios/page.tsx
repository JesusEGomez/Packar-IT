"use client";
import CardNotification from "@/app/components/CardNotification";
import CardStatusNotification from "@/app/components/CardStatusNotification";
import { INotification } from "@/app/interfaces/notifications.interface";
import useUserState from "@/app/store/sotre";

import { useEffect, useState } from "react";

const NotViajes = () => {
  const [notifications, setNotification] = useState<INotification[] | null>();
  const { user } = useUserState((state) => state);
  const [visto, setVisto] = useState(true);
  const [update, setUpdate] = useState(false);

  const filter = (notifications: INotification[]) => {
    console.log(notifications);
    if (notifications) {
      const found = notifications.find((n) => n.vistoUser === false);

      console.log(found);
      if (found) setVisto(false);
    }
  };

  const updateCards = () => {
    setUpdate(true);
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `/api/auth/addNotification/?id=${user._id}&type=usuario._id`
      );
      const newNotifications: INotification[] = await response.json();
      console.log(newNotifications);
      if (response.ok && newNotifications) {
        setNotification(newNotifications);
        filter(newNotifications);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setUpdate(false);
    fetchNotifications();
  }, [update]);

  return (
    <div className="w-full flex  flex-col overflow-auto gap-2 justify-center items-center md:pl-48 md:pr-24">
      {notifications ? (

        !visto ? (
          <>
            {notifications?.reverse().map((n) => {
              return (
                <>
                  {n.vistoUser ? null : n.subestado === "solicitud" ? (
                    <CardNotification
                      id={n._id}
                      name={n.usuario?.fullname!}
                      type={n.type!}
                      visto={n.vistoUser!}
                      detail="notEnvios"
                    />
                  ) : (
                    <CardStatusNotification
                      estadoEnvio={n.estadoEnvio}
                      name={n.producto?.name!}
                      id={n._id}
                      updateCards={updateCards}
                      type={n.type!}
                    />
                  )}
                </>
              );
            })}
          </>
        ) : (
          <>No tienes Notificaciones</>
        )
      ) : (
        <div>No tienes Notificaciones</div>
      )}
    </div>
  );
};

export default NotViajes;
