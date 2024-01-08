import { Button } from "@/components/ui/button";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaExclamationCircle } from "react-icons/fa";
import { map } from "zod";
import { ITravel } from "../loged/driver/page";
import { GiPathDistance } from "react-icons/gi";
import { CalendarDays, CheckCircle2 } from "lucide-react";
interface IPropsDriver {
  closeModal: () => void;
  flexHandle: () => void;
  flex: boolean;
  travel: ITravel;
}

function FinalDriverModal({
  closeModal,
  travel,
  flexHandle,
  flex,
}: IPropsDriver) {
  const sendTravel = () => {
    console.log("Viaje desde el modal", travel);
  };
  return (
    <div>
      <Button onClick={() => closeModal()} variant={"ghost"}>
        <IoMdArrowRoundBack />
      </Button>
      <div className="flex">
        <h1 className="text-xl font-bold mb-4">Tu trayecto</h1>
        <FaExclamationCircle className="text-slate-400" />
      </div>
      <div className="w-[450px] h-[155px] flex rounded-xl bg-gray-50  shadow-md justify-around ">
        <div>
          <div className="flex mb-8">
            <GiPathDistance
              className={`${travel.eresFlexible ? "text-pink" : "text-black"}`}
              size={50}
            />
            <div>
              <p>
                Desde: {travel.desde.calle} / {travel.horaSalida}
              </p>
              <p>
                Hasta: {travel.hasta.calle} / {travel.horaLlegada}
              </p>
            </div>
          </div>
          <div className="flex ">
            <CalendarDays />
            {travel.cuando.date?.toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </div>
        </div>
        <div>
          <div className="border-2 mb-2 relative h-[28px] w-[125px] border-slate-300 rounded p-4">
            <div className="bg-pink top-[-1px] left-[-10px] w-12 h-4 text-white absolute  text-center text-[10px] font-bold justify-center rounded">
              Pequeño
            </div>
            <div className="flex justify-evenly    ">
              <div className="flex   items-center ">
                <p className="text-sm font-bold ">#</p>
                <p className="text-sm font-bold">{travel.precio[0].quantity}</p>
              </div>
              <div className="flex   items-center ">
                <p className="text-sm font-bold ">$</p>
                <p className="text-sm font-bold">{travel.precio[0].price}</p>
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
                <p className="text-sm font-bold">{travel.precio[1].quantity}</p>
              </div>
              <div className="flex   items-center ">
                <p className="text-sm font-bold ">$</p>
                <p className="text-sm font-bold">{travel.precio[1].price}</p>
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
                <p className="text-sm font-bold">{travel.precio[2].quantity}</p>
              </div>
              <div className="flex   items-center ">
                <p className="text-sm font-bold ">$</p>
                <p className="text-sm font-bold">{travel.precio[2].price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[50px] my-5 flex justify-around items-center rounded-xl bg-gray-50 shadow-md">
        <div className="flex justify-stretch w-1/2">
          <p className="text-pink mr-2 ">Eres flexible</p>
          {flex ? <CheckCircle2 className="text-green-400" /> : null}
        </div>
        <Button
          onClick={flexHandle}
          className="bg-rose-200 text-pink text-sm w-[60px] h-[24px] "
        >
          Editar
        </Button>
      </div>
      <Button className="w-full bg-pink text-white" onClick={sendTravel}>
        Enviar
      </Button>{" "}
    </div>
  );
}

export default FinalDriverModal;
