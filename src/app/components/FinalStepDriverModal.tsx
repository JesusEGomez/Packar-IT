import { Button } from "@/components/ui/button";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaExclamationCircle } from "react-icons/fa";
import { map } from "zod";
import { ITravel } from "../loged/driver/page";
interface IPropsDriver {
  closeModal: () => void;
  travel: ITravel;
}

function FinalDriverModal({ closeModal, travel }: IPropsDriver) {
  const sendTravel = () => {
    console.log("Viaje desde el modal", travel);
    alert("Viaje enviado");
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
      <div className="w-[370px] h-[155px] flex-shrink-0">
        <div>
          <div className="border-2 relative h-[28px] w-[120px] border-slate-300 rounded p-4">
            <div className="bg-pink top-[-1px] left-[-10px] w-12 h-4 text-white absolute  text-center text-xs font-bold justify-center rounded">
              s
            </div>
            <div className="flex justify-between   ">
              <div className="flex   items-center ">
                <p className="text-sm font-bold ">#</p>
                <p className="text-sm font-bold">2</p>
              </div>
              <div className="flex   items-center ">
                <p className="text-sm font-bold ">$</p>
                <p className="text-sm font-bold">2</p>
              </div>
            </div>
          </div>
          <div className="border-2 relative h-[28px] w-[120px] border-slate-300 rounded p-4">
            <div className="bg-pink top-[-1px] left-[-10px] w-12 h-4 text-white absolute  text-center text-xs font-bold justify-center rounded">
              s
            </div>
            <div className="flex justify-between  ">
              <div className="flex   items-center ">
                <p className="text-sm font-bold ">#</p>
                <p className="text-sm font-bold">2</p>
              </div>
              <div className="flex   items-center ">
                <p className="text-sm font-bold ">$</p>
                <p className="text-sm font-bold">2</p>
              </div>
            </div>
          </div>
          <div className="border-2 relative h-[28px] w-[120px] border-slate-300 rounded p-4">
            <div className="bg-pink top-[-1px] left-[-10px] w-12 h-4 text-white absolute  text-center text-xs font-bold justify-center rounded">
              s
            </div>
            <div className="flex justify-between  ">
              <div className="flex   items-center ">
                <p className="text-sm font-bold ">#</p>
                <p className="text-sm font-bold">2</p>
              </div>
              <div className="flex   items-center ">
                <p className="text-sm font-bold ">$</p>
                <p className="text-sm font-bold">2</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button onClick={sendTravel}>Enviar</Button>
    </div>
  );
}

export default FinalDriverModal;
