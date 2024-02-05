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
      console.log({ ...product.EnvioInfo, estado: state });
      if (state) {
        const response = await fetch(`/api/auth/ProductById`, {
          method: "PATCH",
          body: JSON.stringify({ ...product.EnvioInfo, estado: state }),
        });

        if (response.ok) {
          setLoading(false);
          updateData();
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
    <div className="flex w-screen  h-screen flex-col p-4">
      <Button className="w-14" onClick={closeInfoModal} variant={"ghost"}>
        <IoMdArrowRoundBack />
      </Button>

      <div className="h-1/3 flex p-2 items-center flex-col rounded-xl bg-gray-50 gap-y-2  shadow-md  ">
        <h3 className="text-xl font-semibold">Datos del Receptor</h3>
        <div className="flex gap-4 flex-col">
          <div className="flex gap-x-2 text-lg ">
            <User />{" "}
            <p>{` Nombre: ${product.EnvioInfo.recibe.nombreApellidos}`}</p>{" "}
          </div>
          <div className="flex  gap-x-2 text-lg">
            <Phone /> <p>{`Telefono: ${product.EnvioInfo.recibe.telefono}`}</p>
          </div>
          <div className="flex gap-x-2 text-lg ">
            <MailIcon /> <p>{`Mail: ${product.EnvioInfo.recibe.email}`}</p>
          </div>
        </div>
      </div>
      <div className="h-1/4 flex p-2 gap-y-2 items-center flex-col rounded-xl bg-gray-50  shadow-md  ">
        <label htmlFor="estado" className="text-xl font-semibold">
          Modificar el Estado de Envio
        </label>
        <select onChange={stateHandler} name="estado" id="estado">
          <option disabled selected value={product.EnvioInfo.estado}>
            {product.EnvioInfo.estado}
          </option>

          {product.EnvioInfo.estado === "Pendiente" ? (
            <>
              {estado === "En Curso" ? (
                <option value={"En Curso"}>En Curso</option>
              ) : null}
              <option value={"Cancelado"}>Cancelado</option>
            </>
          ) : null}
          {product.EnvioInfo.estado === "En Curso" ? (
            <option value={"Finalizado"}>Finalizado</option>
          ) : null}
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
              product.EnvioInfo.estado === "Finalizado"
            }
            onClick={changeState}
          >
            Modificar
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductInfoModal;
