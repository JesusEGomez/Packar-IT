"use client";
import { useEffect, useState } from "react";
import { GiPathDistance } from "react-icons/gi";
import { ITravelDB } from "@/app/interfaces/TravelDB.interface";
import { CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowLeft } from "react-icons/md";

const Page = ({ params }: { params: { id: string } }) => {
  const [travel, setTravel] = useState<ITravelDB | null>(null);
  const navigate = useRouter();

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
    <div className="w-full flex flex-col justify-center items-center">
      {travel ? (
        <div className="w-screen flex justify-center flex-col items-center">
          <div className="w-full h-20">
            <button className="text-3xl" onClick={navigate.back}>
              <MdKeyboardArrowLeft />
            </button>
            <h2 className="text-xl font-bold ml-5">Tu viaje</h2>
          </div>
          <div className="h-[155px] flex items-center flex-col rounded-xl bg-gray-50  shadow-md justify-around ">
            <div>
              <div className="flex gap-5 mb-2">
                <GiPathDistance className={"text-pink"} size={50} />
                <div>
                  <p>
                    {`Desde: ${travel.desde.pais}, ${travel.desde.calle} / ${travel.horaSalida}`}
                  </p>
                  <p>
                    {`Hasta: ${travel.hasta.pais}, ${travel.hasta.calle} / ${travel.horaLlegada}`}
                  </p>
                </div>
              </div>
              <div className="flex ">
                <CalendarDays />
                {/* {travel.cuando} */}
              </div>
            </div>
            <div className="flex gap-2 w-full justify-center">
              <div className="border-2 mb-2 relative h-[28px] w-[125px] border-slate-300 rounded p-4">
                <div className="bg-pink top-[-1px] left-[-10px] w-12 h-4 text-white absolute  text-center text-[10px] font-bold justify-center rounded">
                  Pequeño
                </div>
                <div className="flex justify-evenly    ">
                  <div className="flex   items-center ">
                    <p className="text-sm font-bold ">#</p>
                    {/* <p className="text-sm font-bold">{travel.precio[0].quantity}</p> */}
                  </div>
                  <div className="flex   items-center ">
                    <p className="text-sm font-bold ">$</p>
                    {/* <p className="text-sm font-bold">{travel.precio[0].price}</p> */}
                  </div>
                </div>
              </div>
              <div className="border-2 relative mb-2   h-[28px] w-[125px] border-slate-300 rounded p-4">
                <div className="bg-pink top-[-1px] left-[-10px] w-12 h-4 text-white absolute  text-center text-[10px] font-bold justify-center rounded">
                  Mediano
                </div>
                <div className="flex justify-evenly  ">
                  <div className="flex   items-center ">
                    <p className="text-sm font-bold ">#</p>
                    {/* <p className="text-sm font-bold">{travel.precio[1].quantity}</p> */}
                  </div>
                  <div className="flex   items-center ">
                    <p className="text-sm font-bold ">$</p>
                    {/* <p className="text-sm font-bold">{travel.precio[1].price}</p> */}
                  </div>
                </div>
              </div>
              <div className="border-2 relative h-[28px] w-[125px] border-slate-300 rounded p-4">
                <div className="bg-pink top-[-1px] left-[-10px] w-12 h-4 text-white absolute  text-center text-[10px] font-bold justify-center rounded">
                  Grande
                </div>
                <div className="flex justify-evenly  ">
                  <div className="flex   items-center ">
                    <p className="text-sm font-bold ">#</p>
                    {/* <p className="text-sm font-bold">{travel.precio[2].quantity}</p> */}
                  </div>
                  <div className="flex   items-center ">
                    <p className="text-sm font-bold ">$</p>
                    {/* <p className="text-sm font-bold">{travel.precio[2].price}</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>Objetos especiales</div>
          <div>Flexible</div>
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
};

export default Page;
