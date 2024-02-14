import { Button } from "@/components/ui/button";
import { IoMdCloseCircleOutline } from "react-icons/io";
import {
  MdOutlineNotificationsActive,
  MdOutlineNotificationsNone,
} from "react-icons/md";

interface ICardStatusNotificationProps {
  estadoEnvio:
    | "Pendiente"
    | "Aceptado"
    | "Cancelado"
    | "En Curso"
    | "Entregado"
    | "Finalizado";
  id: string;
  name: string;
  type: string;
  updateCards: () => void;
}

//* Debo recibir por parámetros el id para marcarla como vista y no volver a renderizarla
//* Debo poder diferenciar si el cambio de estado es del producto o del envió en general

const CardStatusNotification = ({
  estadoEnvio,
  id,
  name,
  type,
  updateCards,
}: ICardStatusNotificationProps) => {
  const setVisto = async () => {
    try {
      if (type === "solicitudServicio") {
        const response = await fetch(`/api/auth/getNotificationById`, {
          method: "PATCH",
          body: JSON.stringify({ _id: id, vistoUser: true }),
        });
        response.ok && updateCards();
      } else {
        const response = await fetch(`/api/auth/getNotificationById`, {
          method: "PATCH",
          body: JSON.stringify({ _id: id, vistoDriver: true }),
        });
        response.ok && updateCards();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full h-[90px] rounded-xl  shadow-md hover:bg-gray-100 bg-white justify-around sm:justify-evenly items-center flex">
      <p className={`text-5xl  w-1/5  text-pink `}>
        <MdOutlineNotificationsActive />
      </p>
      <div className="flex sm:flex-row sm:gap-x-4 w-3/5  flex-col">
        {type === "solicitudServicio" ? (
          <p>
            El envío de tu producto <b>{name}</b> a cambiado de estado a{" "}
            <b>{estadoEnvio}</b>
          </p>
        ) : (
          <p>
            El envío del producto <b>{name}</b> a cambiado de estado a{" "}
            <b>{estadoEnvio}</b>
          </p>
        )}
      </div>

      <p
        onClick={setVisto}
        className=" hover:text-pink text-3xl cursor-pointer w-1/12 text-gray-500"
      >
        <IoMdCloseCircleOutline />
      </p>
    </div>
  );
};

export default CardStatusNotification;
