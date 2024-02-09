"use client";
import { INotification } from "@/app/interfaces/notifications.interface";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FiMapPin } from "react-icons/fi";
import { IoTime } from "react-icons/io5";
import { CalendarDays, CheckCircle2, XCircle } from "lucide-react";

const Page = ({ params }: { params: { id: string } }) => {
  const [notification, setNotification] = useState<INotification | null>();
  const [update, setUpdate] = useState(false);
  const navigation = useRouter();
  const fetchNotification = async () => {
    try {
      const response = await fetch(
        `/api/auth/getNotificationById/?id=${params.id}`
      );
      const newNotification: INotification = await response.json();
      if (response.ok) {
        setNotification(newNotification);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //* Esta función marca como visto a la notificación
  const setVisto = async () => {
    try {
      const response = await fetch(`/api/auth/getNotificationById`, {
        method: "PATCH",
        body: JSON.stringify({ _id: params.id, vistoUser: true }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const response = async (estado: string, id: string) => {
    try {
      const response = await fetch(
        `/api/auth/getNotificationById/?id=${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ _id: params.id, estado: estado }),
        }
      );
      if (response.ok) {
        setUpdate(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //? Tal vez debería redirigir al envió en especifico pero no tengo el id y todavia no se crea
  const moreInformation = () => {
    setVisto();
    navigate.replace("loged/misenvios");
  };

  const navigate = useRouter();
  useEffect(() => {
    setUpdate(false);
    fetchNotification();
  }, [update]);
  return (
    <div className="w-screen flex flex-col justify-center items-center">
      {notification ? (
        <div className=" flex gap-y-5 overflow-auto h-full flex-col items-center">
          <div className="w-full flex flex-col p-5 justify-start h-20">
            <button className="text-3xl" onClick={navigate.back}>
              <MdKeyboardArrowLeft />
            </button>
            <h2 className="text-xl sm:text-2xl sm:ml-20 font-bold ml-5">
              Solicitud Para <b>{notification.driver?.usuario?.fullname}</b>
            </h2>
          </div>
          <div className=" flex flex-col gap-y-4 sm:justify-evenly sm:h-52 sm:flex-row sm:w-screen">
            <div className=" flex sm:w-2/4 p-2 w-[350px] flex-col  rounded-xl bg-gray-50  shadow-md justify-around ">
              <div className="sm:flex mb-2 justify-around  items-center w-full">
                <div className="flex sm:gap-y-2 flex-col">
                  <div className="flex w-full  items-center gap-x-2">
                    <FiMapPin />
                    <p>
                      <span className="font-semibold">Desde:</span>{" "}
                      {`${notification.desde?.pais}, ${notification.desde?.calle}`}
                    </p>
                  </div>
                  <div className="flex w-full   items-center gap-x-2">
                    <IoTime />
                    <p>
                      <span className="font-semibold">Salida:</span>
                      {` ${notification.driver?.horaSalida}`}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:gap-y-2   ">
                  <div className="flex w-full  items-center gap-x-2">
                    <FiMapPin />
                    <p>
                      {" "}
                      <span className="font-semibold">Hasta:</span>
                      {` ${notification.hasta?.pais}, ${notification.hasta?.calle}`}
                    </p>
                  </div>
                  <div className="flex w-full  items-center gap-x-2">
                    <IoTime />
                    <p>
                      {" "}
                      <span className="font-semibold">Llegada:</span>
                      {` ${notification.driver?.horaLlegada}`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 items-center justify-center ">
                <CalendarDays />
                {notification.driver?.cuando}
              </div>
            </div>
          </div>
          <div className=" flex sm:flex-row sm:gap-x-4 flex-col">
            <div className=" flex flex-col gap-y-4  rounded-xl bg-gray-50  shadow-md  items-center sm:h-60 p-5 sm:w-[500px] sm:p-0   w-[380px]">
              <p>El conductor recibo tu solicitud</p>
              <div className="flex flex-col items-center gap-y-3">
                {notification.estado === "Pendiente" && (
                  <Button
                    onClick={() => response("Rechazado", notification._id)}
                    className="bg-pink text-white"
                  >
                    Cancelar
                  </Button>
                )}
                {notification.estado === "Aceptado" && (
                  <>
                    <p>Tu solicitud fue Aceptada</p>
                    <Button
                      onClick={moreInformation}
                      className="bg-pink text-white"
                    >
                      Mas Información
                    </Button>
                  </>
                )}
                {notification.estado === "Rechazado" && (
                  <>
                    <p>Tu solicitud fue Rechazada</p>
                    <Button className="bg-pink text-white">
                      Seleccionar otro conductor
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className=" flex flex-col gap-y-4  rounded-xl bg-gray-50  shadow-md  items-center sm:h-60 p-5 sm:w-[500px] sm:p-0   w-[380px]">
              <p>Información del producto que quieres enviar</p>
              <div className="flex flex-col sm:flex-row w-full justify-evenly items-center gap-x-2 ">
                <div className="sm:flex flex-col gap-y-3">
                  <h3>
                    <b>Nombre:</b> {notification.producto?.name}
                  </h3>
                  <p>
                    <b>Tamaño:</b> {notification.producto?.size}
                  </p>
                  <p>
                    <b>Peso:</b> {notification.producto?.weigth}
                  </p>
                </div>
                <img
                  onClick={() =>
                    window.open(notification.producto?.photoProduct, "_blank")
                  }
                  className="p-1 rounded-md shadow-sm cursor-pointer shadow-gray-500 "
                  width={180}
                  height={180}
                  src={notification.producto?.photoProduct}
                  alt={notification.producto?.name}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-3"></div>
          {/* <div className="flex justify-center gap-x-4 w-full">
            <Button
              onClick={() => response("Aceptado", notification._id!)}
              className="bg-pink text-white"
            >
              Aceptar Solicitud
            </Button>
            <Button
              onClick={() => response("Rechazado", notification._id!)}
              className="bg-pink text-white"
            >
              Cancelar Solicitud
            </Button>
          </div> */}
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
};

export default Page;
