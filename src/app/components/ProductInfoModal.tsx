import { Button } from "@/components/ui/button";
import { IUserProduct } from "../interfaces/userProduct.interface";
import { IoMdArrowRoundBack } from "react-icons/io";

import { Phone, MailIcon, User, Loader2 } from "lucide-react";
import { useState } from "react";
import { IProductEnvio } from "../interfaces/productDB.interface";

interface IProductInfoProps {
  closeInfoModal: () => void;
  product: IProductEnvio;
}
const ProductInfoModal = ({ closeInfoModal, product }: IProductInfoProps) => {
  console.log(product);
  const [state, setState] = useState<string>();
  const [loading, setLoading] = useState(false);

  const changeState = async () => {
    setLoading(true);
    try {
      console.log({ ...product.EnvioInfo, estado: state });
      const response = await fetch(`/api/auth/ProductById`, {
        method: "PATCH",
        body: JSON.stringify({ ...product.EnvioInfo, estado: state }),
      });

      if (response.ok) {
        setLoading(false);
        location.reload();
      }
    } catch (error) {}
  };
  const stateHanlder = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
        <select onChange={stateHanlder} name="estado" id="estado">
          <option defaultValue={product.EnvioInfo.estado}>
            {product.EnvioInfo.estado}
          </option>

          {product.EnvioInfo.estado === "Pendiente" ? (
            <>
              <option value={"En Curso"}>En Curso</option>
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
