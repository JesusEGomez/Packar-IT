import { Button } from "@/components/ui/button";
import { IUserProduct } from "../interfaces/userProduct.interface";
import { IoMdArrowRoundBack } from "react-icons/io";

import { Phone, MailIcon, User } from "lucide-react";
import { useState } from "react";

interface IProductInfoProps {
  closeInfoModal: () => void;
  product: IUserProduct;
}
const ProductInfoModal = ({ closeInfoModal, product }: IProductInfoProps) => {
  console.log(product);
  const [state, setState] = useState<string>();
  const changeState = async () => {
    try {
      const response = await fetch(`/api/auth/ProductById`, {
        method: "PATCH",
        body: JSON.stringify({ ...product, estado: state }),
      });

      console.log(response);
    } catch (error) {}
  };
  const stateHanlder = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
            <User /> <p>{` Nombre: ${product.recibe.nombreApellidos}`}</p>{" "}
          </div>
          <div className="flex  gap-x-2 text-lg">
            <Phone /> <p>{`Telefono: ${product.recibe.telefono}`}</p>
          </div>
          <div className="flex gap-x-2 text-lg ">
            <MailIcon /> <p>{`Mail: ${product.recibe.email}`}</p>
          </div>
        </div>
      </div>
      <div className="h-1/4 flex p-2 gap-y-2 items-center flex-col rounded-xl bg-gray-50  shadow-md  ">
        <label htmlFor="estado" className="text-xl font-semibold">
          Modificar el Estado de Envio
        </label>
        <select onChange={stateHanlder} name="estado" id="estado">
          <option defaultValue={product.estado}>{product.estado}</option>
          <option value={"Cancelado"}>Cancelado</option>
          {product.estado === "Pendiente" ? (
            <option value={"En Curso"}>En Curso</option>
          ) : null}
          {product.estado === "En Curso" ? (
            <option value={"Finalizado"}>Finalizado</option>
          ) : null}
        </select>
        <Button disabled={product.estado === "Cancelado"} onClick={changeState}>
          Modificar
        </Button>
      </div>
    </div>
  );
};

export default ProductInfoModal;
