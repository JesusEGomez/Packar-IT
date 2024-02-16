"use client";

import TravelCard from "@/app/components/travelCard";
import useUserState from "@/app/store/sotre";
import { useEffect } from "react";

const Viajes = () => {
  const { travels, fetchTravels, user } = useUserState((state) => state);

  useEffect(() => {
    fetchTravels(user._id);
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
              eresFlexible={travel.eresFlexible}
            />
          );
        })
      ) : (
        <div className="flez justify-center items-center">
          <h3>No Tienes viajes</h3>
        </div>
      )}
    </div>
  );
};

export default Viajes;
