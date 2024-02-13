import { Button } from "react-day-picker";
import { IoMdCloseCircleOutline } from "react-icons/io";
import {
  MdOutlineNotificationsActive,
  MdOutlineNotificationsNone,
} from "react-icons/md";

interface ICardStatusNotificationProps {
  estado: "Aceptado" | "Cancelado" | "En Curso" | "Entregado" | "Finalizado";
  id: string;
}

//* Debo recibir por parámetros el id para marcarla como vista y no volver a renderizarla
//* Debo poder diferenciar si el cambio de estado es del producto o del envió en general

const CardStatusNotification = ({
  estado,
  id,
}: ICardStatusNotificationProps) => {
  return (
    <div className="w-full h-[90px] rounded-xl  shadow-md hover:bg-gray-100 bg-white justify-around sm:justify-evenly items-center flex">
      <p className={`text-5xl  w-1/5  text-pink `}>
        <MdOutlineNotificationsActive />
      </p>
      <div className="flex sm:flex-row sm:gap-x-4 w-3/5  flex-col">
        <p>
          El envío de tu producto a cambiado de estado a <b>{estado}</b>
        </p>
      </div>

      <p className="text-3xl hover:text-pink cursor-pointer w-1/12 text-gray-500">
        <Button
          onAbort={() =>
            console.log(`marcar como visto la notificacion con el id ${id}`)
          }
        >
          <IoMdCloseCircleOutline />
        </Button>
      </p>
    </div>
  );
};

export default CardStatusNotification;
