import { Button } from "@/components/ui/button";

import { IoMdArrowRoundBack } from "react-icons/io";
import { TbCubeSend } from "react-icons/tb";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import ProductInfoModal from "./ProductInfoModal";
import { IProductEnvio } from "../interfaces/productDB.interface";

interface ISendModalProps {
  closeModal: () => void;
  envios: [{ productos: [IProductEnvio]; _id: string }] | undefined;
}
export const SendModal = ({ closeModal, envios }: ISendModalProps) => {
  //console.log(envios);
  const [open, setOpen] = useState(false);
  const [numberModal, setNumberModal] = useState<Number>();
  const closeInfoModal = () => {
    setOpen(false);
  };

  const openModal = (i: number) => {
    setNumberModal(i);
    setOpen(true);
  };
  //console.log(envios);
  return (
    <div className="flex w-screen  h-screen flex-col p-4">
      <Button className="w-14" onClick={closeModal} variant={"ghost"}>
        <IoMdArrowRoundBack />
      </Button>
      <h2 className="text-2xl font-bold text-center">Envios</h2>
      <div className=" h-screen gap-y-2 overflow-auto">
        {envios?.map((envio, i) => {
          return (
            <div
              key={envio.productos[0]._id}
              className="w-full h-[90px] rounded-xl my-2    shadow-md hover:bg-gray-100 bg-white justify-around sm:justify-evenly items-center flex"
            >
              <p className="text-5xl  w-1/5 text-pink">
                <TbCubeSend />
              </p>
              <div className="flex sm:flex-row sm:gap-x-4 w-2/4  flex-col">
                <h3 className="font-bold ">
                  {`Producto: ${envio.productos[0].name}`}
                </h3>

                <p>{`Estado: ${envio.productos[0].EnvioInfo.estado}`}</p>
              </div>

              <button
                onClick={() => openModal(i)}
                className="text-3xl hover:text-pink cursor-pointer w-1/12 text-gray-500"
              >
                <MdKeyboardArrowRight />
              </button>
              {open && numberModal === i && (
                <div className="fixed top-0 z-20 left-0 right-0  bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-4 rounded-xl">
                    <ProductInfoModal
                      closeInfoModal={closeInfoModal}
                      product={envio.productos}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
