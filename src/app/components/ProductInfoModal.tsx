import { Button } from "@/components/ui/button";

import { IoMdArrowRoundBack } from "react-icons/io";

import { Phone, MailIcon, User, Loader2 } from "lucide-react";
import { useState } from "react";
import { IProductEnvio } from "../interfaces/productDB.interface";
import Swal from "sweetalert2";

interface IProductInfoProps {
  closeInfoModal: () => void;
  product: IProductEnvio;
  updateData: () => void;
  estado: string;
}
const ProductInfoModal = ({
  closeInfoModal,
  estado,
  product,
  updateData,
}: IProductInfoProps) => {
  console.log(estado);
  const [state, setState] = useState<string>();
  const [loading, setLoading] = useState(false);

  const changeState = async () => {
    setLoading(true);
    try {
      if (state && state !== product.EnvioInfo.estado) {
        const response = await fetch(`/api/auth/ProductById`, {
          method: "PATCH",
          body: JSON.stringify({ ...product.EnvioInfo, estado: state }),
        });

        if (response.ok) {
          updateData();

          const info = await fetch("/api/auth/getNotificationById", {
            headers: {
              "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify({ ...product.EnvioInfo, estado: state }),
          });

          if (info.ok) {
            Swal.fire({
              icon: "success",
              title: "El cambio se realizo con éxito",
              text: "Se le notificara al usuario el estado de su paquete",
              confirmButtonColor: "#fe1252",
              confirmButtonText: "Aceptar",
              showConfirmButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                setLoading(false);
                closeInfoModal();
              }
            });
          }
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Ocurrió un error al modificar el estado",
          confirmButtonColor: "#fe1252",
          confirmButtonText: "Aceptar",
        });
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const stateHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setState(event.target.value);
  };
  return (
    <div className="flex w-screen  h-screen gap-y-5 overflow-auto  items-center flex-col p-4">
      <div className="w-full flex items-start">
        <Button className="w-14" onClick={closeInfoModal} variant={"ghost"}>
          <IoMdArrowRoundBack />
        </Button>
      </div>

      <div className=" flex sm:gap-x-5 gap-y-5 sm:justify-center  items-center w-full flex-col sm:flex-row   ">
        <div className="flex w-full   flex-col sm:w-2/5 rounded-xl p-5 bg-gray-50 gap-y-2  shadow-md">
          <h3 className="text-xl font-semibold">Datos del Solicitante</h3>
          <div className="flex gap-4 flex-col">
            <div className="flex gap-x-2 text-lg ">
              <User />{" "}
              <p
                title={product.EnvioInfo.usuario.fullname}
                className="truncate cursor-pointer"
              >{`${product.EnvioInfo.usuario.fullname}`}</p>{" "}
            </div>
            <div className="flex  gap-x-2 text-lg">
              <Phone /> <p>{`${product.EnvioInfo.usuario.phoneNumber}`}</p>
            </div>
            <div className="flex  gap-x-2 text-lg ">
              <MailIcon />{" "}
              <p
                title={product.EnvioInfo.usuario.email}
                className="truncate cursor-pointer"
              >{`${product.EnvioInfo.usuario.email}`}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full sm:w-2/5 rounded-xl p-5 bg-gray-50 gap-y-2  shadow-md">
          <h3 className="text-xl font-semibold">Datos del Receptor</h3>
          <div className="flex gap-4 flex-col">
            <div className="flex gap-x-2 text-lg ">
              <User />{" "}
              <p
                title={product.EnvioInfo.recibe.nombreApellidos}
                className="truncate cursor-pointer"
              >{`${product.EnvioInfo.recibe.nombreApellidos}`}</p>{" "}
            </div>
            <div className="flex  gap-x-2 text-lg">
              <Phone /> <p>{`${product.EnvioInfo.recibe.telefono}`}</p>
            </div>
            <div className="flex gap-x-2 text-lg ">
              <MailIcon />{" "}
              <p
                title={product.EnvioInfo.recibe.email}
                className="truncate cursor-pointer"
              >{`${product.EnvioInfo.recibe.email}`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-fit flex p-5 gap-y-2 items-center flex-col rounded-xl bg-gray-50  shadow-md  ">
        <label htmlFor="estado" className="text-xl font-semibold">
          Modificar el Estado de Envio
        </label>
        <select onChange={stateHandler} name="estado" id="estado">
          <option disabled selected defaultValue={product.EnvioInfo.estado}>
            {product.EnvioInfo.estado}
          </option>

          {estado === "En Curso" && (
            <option value={"En Curso"}>En Curso</option>
          )}
          {product.EnvioInfo.estado === "En Curso" && (
            <option value={"Entregado"}>Entregado</option>
          )}
        </select>
        {loading ? (
          <Button disabled className=" bg-pink text-white rounded-lg ">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </Button>
        ) : (
          <Button
            className="bg-pink text-white rounded-lg"
            disabled={
              product.EnvioInfo.estado === "Cancelado" ||
              product.EnvioInfo.estado === "Entregado" ||
              product.EnvioInfo.estado === "Finalizado"
            }
            onClick={changeState}
          >
            Modificar
          </Button>
        )}
        {product.EnvioInfo.estado === "Entregado" && (
          <p>
            El viaje se dara por <b>Finalizado</b> cuando el dueño del paquete
            verifique el estado del mismo
          </p>
        )}
        {product.EnvioInfo.estado === "Finalizado" && (
          <p>El usuario ha corroborado que el paquete llego en buen estado</p>
        )}
      </div>
    </div>
  );
};

export default ProductInfoModal;
