"use client";

import TravelCard from "@/app/components/travelCard";
import useUserState from "@/app/store/sotre";
import { useEffect } from "react";

const Viajes = () => {
  const { travels, fetchTravels, user } = useUserState((state) => state);

  useEffect(() => {
    !travels.length && fetchTravels(user._id);
  }, []);
  console.log(travels);
  return (
    <div className="w-full flex  flex-col overflow-auto gap-2 justify-center items-center">
      {travels.length ? (
        travels.map((travel) => {
          return (
            <TravelCard
              key={travel._id}
              cuando={travel.cuando!}
              desde={travel.desde}
              estado={travel.estado}
              hasta={travel.hasta}
              horaLlegada={travel.horaLlegada!}
              horaSalida={travel.horaSalida!}
              _id={travel._id}
            />
          );
        })
      ) : (
        <div>No Tienes viajes</div>
      )}
    </div>
  );
};

export default Viajes;
