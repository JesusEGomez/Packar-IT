"use client";
import { useEffect, useState } from "react";
import { GiPathDistance } from "react-icons/gi";
import { ITravelDB } from "@/app/interfaces/TravelDB.interface";
import { CalendarDays, CheckCircle2, X, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import { IoTime } from "react-icons/io5";

const Page = ({ params }: { params: { id: string } }) => {
  const [travel, setTravel] = useState<ITravelDB | null>(null);
  const navigate = useRouter();
  const size = ["Pequeño", "Mediano", "Grande"];

  const fetTravelById = async (id: string) => {
    try {
      const response = await fetch(`/api/auth/getTravelById/?id=${id}`);
      const newTravel = await response.json();
      console.log(newTravel);
      setTravel(newTravel);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetTravelById(params.id);
    console.log(travel);
  }, [params.id]);
  return (
    <div className="w-screen flex flex-col justify-center items-center">
      {travel ? (
        <div className=" flex gap-y-5  flex-col items-center">
          <div className="w-full h-20">
            <button className="text-3xl" onClick={navigate.back}>
              <MdKeyboardArrowLeft />
            </button>
            <h2 className="text-xl font-bold ml-5">Tu viaje</h2>
          </div>
          <div className="h-1/3 flex p-2 items-center flex-col rounded-xl bg-gray-50  shadow-md justify-around ">
            <div>
              <div className="flex mb-2">
                <div>
                  <div className="flex w-full flex-col">
                    <div className="flex w-full  items-center gap-x-2">
                      <FiMapPin />
                      <p>
                        <span className="font-semibold">Desde:</span>{" "}
                        {`${travel.desde.pais}, ${travel.desde.calle}`}
                      </p>
                    </div>
                    <div className="flex w-full  items-center gap-x-2">
                      <IoTime />
                      <p>
                        <span className="font-semibold">Salida:</span>
                        {` ${travel.horaSalida}`}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex w-full  items-center gap-x-2">
                      <FiMapPin />
                      <p>
                        {" "}
                        <span className="font-semibold">Hasta:</span>
                        {` ${travel.hasta.pais}, ${travel.hasta.calle}`}
                      </p>
                    </div>
                    <div className="flex w-full  items-center gap-x-2">
                      <IoTime />
                      <p>
                        {" "}
                        <span className="font-semibold">Llegada:</span>
                        {` ${travel.horaLlegada}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center justify-center ">
                <CalendarDays />
                {travel.cuando}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full justify-center">
            {travel.precio.map((travel, i) => {
              return (
                <div
                  key={i}
                  className="border-2 mb-1 mx-2 relative  border-slate-300 rounded p-4"
                >
                  <div className="bg-pink top-[-10px] left-[-10px] w-1/4 h-6 text-white absolute  text-center text-[15px] font-bold justify-center rounded-md">
                    {size[i]}
                  </div>
                  <div className="flex justify-evenly    ">
                    <div className="flex   items-center ">
                      <p className="text-sm font-bold">
                        <span>Cantidad:</span> {travel.quantity}
                      </p>
                    </div>
                    <div className="flex   items-center ">
                      <p className="text-sm font-bold ">$</p>
                      <p className="text-sm font-bold">{travel.price}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="h-1/3 flex p-2 items-center flex-col rounded-xl bg-gray-50  shadow-md justify-around">
            {" "}
            {travel.special ? (
              <div className="flex gap-x-2 p-2">
                <p>Aceptas productos especiales</p>{" "}
                <CheckCircle2 className="text-green-400" />
              </div>
            ) : (
              <div className="flex gap-x-2 p-2">
                <p>No aceptas productos especiales</p>
                <XCircle className="text-pink" />
              </div>
            )}
          </div>
          <div className="h-1/3 flex p-2 items-center flex-col rounded-xl bg-gray-50  shadow-md justify-around">
            {travel.eresFlexible ? (
              <div className="flex gap-x-2 p-2">
                <p>Eres flexible</p> <CheckCircle2 className="text-green-400" />
              </div>
            ) : (
              <div className="flex gap-x-2 p-2">
                <p>No eres flexible</p>
                <XCircle className="text-pink" />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
};

export default Page;
