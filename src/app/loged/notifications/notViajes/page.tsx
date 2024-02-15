"use client";
import CardNotification from "@/app/components/CardNotification";
import CardStatusNotification from "@/app/components/CardStatusNotification";
import { INotification } from "@/app/interfaces/notifications.interface";
import useUserState from "@/app/store/sotre";

import { useEffect, useState } from "react";

const NotViajes = () => {
  const [notifications, setNotification] = useState<INotification[] | null>();
  const { user } = useUserState((state) => state);
  const [visto, setVisto] = useState(false);
  const [update, setUpdate] = useState(false);

  const filter = (notifications: INotification[]) => {
    console.log(notifications);
    const found = notifications.find(
      (n) => n.estado === "Pendiente" || n.type === "respuestaServicio"
    );
    console.log(found);
    if (found) setVisto(true);
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `/api/auth/addNotification/?id=${user._id}&type=driver.usuario._id`
      );
      const newNotifications: INotification[] = await response.json();
      console.log(newNotifications);
      if (response.ok && newNotifications) {
        setNotification(newNotifications);
        console.log(newNotifications);
        filter(newNotifications);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const updateCards = () => {
    setUpdate(true);
  };

  useEffect(() => {
    setUpdate(false);

    console.log("aca toy");
    fetchNotifications();
  }, [update]);

  return (
    <div className="w-full flex  flex-col overflow-auto gap-2 justify-center items-center">
      {notifications ? (

        visto ? (
          <>
            {notifications?.reverse().map((n) => {
              return (
                <>
                  {n.vistoDriver && n.estado !== "Pendiente" ? null : n.type ===
                    "solicitudServicio" ? (
                    <CardNotification
                      id={n._id}
                      name={n.usuario?.fullname!}
                      type={n.type!}
                      visto={n.vistoDriver!}
                      detail="notViajes"
                    />
                  ) : (
                    <CardStatusNotification
                      estadoEnvio={n.estadoEnvio}
                      id={n._id}
                      name={n.producto?.name!}
                      type={n.type!}
                      updateCards={updateCards}
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
