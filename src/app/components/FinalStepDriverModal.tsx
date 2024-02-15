import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaExclamationCircle } from "react-icons/fa";
import { map } from "zod";
import { ITravel } from "../loged/driver/page";
import { GiPathDistance } from "react-icons/gi";
import { CalendarDays, CheckCircle2 } from "lucide-react";
import useUserState from "../store/sotre";
import Swal from "sweetalert2";

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
  const { postTravel } = useUserState((state) => state);
  //const [sendButton, setSendButton] = useState(true);
  console.log(travel);
  const sendTravel = async () => {
    const response = await postTravel(travel);
    //console.log("viaje enviado", response);
    if (response) {
      Swal.fire({
        title: "¡Se ha publicado tu trayecto!",
        text: "Los usuarios que necesiten transportar algún paquete ya podrán solicitar tu viaje.",
        imageUrl: "/FinalStep.svg",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        background: "#fe1252",
        confirmButtonText: "Cerrar",
        color: "#000",
      }).then((response) => {
        if (response.isConfirmed) {
          location.reload();
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Ocurrió un error",
        confirmButtonColor: "#fe1252",
        confirmButtonText: "reintentar",
      });
    }
  };
  console.log(travel);
  return (
    <>
      <Button onClick={() => closeModal()} variant={"ghost"}>
        <IoMdArrowRoundBack />
      </Button>
      <div className="flex">
        <h1 className="text-xl font-bold mb-4">Tu trayecto</h1>
        <FaExclamationCircle className="text-slate-400" />
      </div>
      <div className=" flex   flex-col rounded-xl bg-gray-50 shadow-md justify-around ">
        <div className="flex flex-col w-full   h-2/5 p-3   justify-between sm:justify-around  rounded-xl bg-gray-50 gap-y-2  shadow-md">
          <div className=" flex     flex-col gap-y-2 ">
            <div className="flex  flex-wrap gap-4">
              <p className="font-bold w-full sm:text-lg  sm:uppercase">
                {`Desde: ${travel.desde.pais}, ${
                  travel.desde.ciudad?.replaceAll("-", " ") + ""
                } / ${travel.horaSalida}hs`}
              </p>
            </div>
            <div className="flex  gap-4">
              <p className="font-bold sm:text-lg truncate sm:uppercase">
                {`Hasta: ${travel.hasta.ciudad?.replaceAll("-", " ")} / ${
                  travel.horaLlegada
                }hs`}
              </p>
            </div>
          </div>
          <div className="flex justify-center  w-full my-2">
            <CalendarDays />
            {travel.cuando}
          </div>
        </div>

        <div className="flex gap-2 p-5 flex-wrap w-full justify-center">
          <div className="border-2 mb-2  relative h-[28px] w-[125px] border-slate-300 rounded p-5">
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
          <div className="border-2 relative mb-2   h-[28px] w-[125px] border-slate-300 rounded p-5">
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
          <div className="border-2 relative h-[28px] w-[125px] border-slate-300 rounded p-5">
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
          <div className="border-2 relative h-[28px] w-[125px] border-slate-300 rounded p-5">
            <div className="bg-pink top-[-1px] left-[-10px] w-12 h-4 text-white absolute  text-center text-[10px] font-bold justify-center rounded">
              Especial
            </div>
            <div className="flex justify-evenly  ">
              <div className="flex   items-center ">
                <p className="text-sm font-bold ">#</p>
                <p className="text-sm font-bold">{travel.precio[3].quantity}</p>
              </div>
              <div className="flex   items-center ">
                <p className="text-sm font-bold ">$</p>
                <p className="text-sm font-bold">{travel.precio[3].price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[50px] my-5 flex justify-around items-center rounded-xl bg-gray-50 shadow-md">
        <p className="text-pink mr-2 ">
          Como viajaras:{" "}
          <span className="font-bold">{travel.como.toUpperCase()}</span>
        </p>
      </div>
      <div className="w-full p-5 h-[50px] my-5 flex justify-evenly items-center rounded-xl bg-gray-50 shadow-md">
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
      <Button className="w-full bg-pink  text-white" onClick={sendTravel}>
        Enviar
      </Button>{" "}
    </>
  );
}

export default FinalDriverModal;
