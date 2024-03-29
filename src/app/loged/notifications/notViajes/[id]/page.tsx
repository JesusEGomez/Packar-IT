"use client";
import { INotification } from "@/app/interfaces/notifications.interface";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FiMapPin } from "react-icons/fi";
import { IoTime } from "react-icons/io5";
import { CalendarDays, CheckCircle2, XCircle } from "lucide-react";
import Accepted from "@/app/components/Acepted";
import Rejected from "@/app/components/Rejected";
import { sendNotification } from "@/app/api/ably/Notifications";
import RejectedPayment from "@/app/components/RejectedPayment";
import Swal from "sweetalert2";

const Page = ({ params }: { params: { id: string } }) => {
  const [notification, setNotification] = useState<INotification | null>();
  const [success, setSuccess] = useState<boolean>(false);
  const [rejected, setRejected] = useState<boolean>(false);
  const [payment, setPayment] = useState<boolean>(false);

  const fetchNotification = async () => {
    try {
      const response = await fetch(
        `/api/auth/getNotificationById/?id=${params.id}`
      );
      const newNotification: INotification = await response.json();

      if (response.ok) {
        setNotification(newNotification);

        if (!newNotification?.vistoDriver) {
          //console.log(notification?.vistoDriver);
          setVisto();
        }
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
        body: JSON.stringify({ _id: params.id, vistoDriver: true }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  //* Esta función realiza la respuesta actualizando esta notificación
  const response = async (estado: string, id: string) => {
    try {
      const response = await fetch(
        `/api/auth/getNotificationById/?id=${params.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ _id: params.id, estado: estado }),
        }
      );

      if (notification && estado === "Rechazado") {
        Swal.fire({
          icon: "error",
          title: "El producto fue rechazado",
          confirmButtonColor: "#fe1252",
          confirmButtonText: "Aceptar",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate.back();
          }
        });
      }
      //console.log(notification?.producto, 'soy el prod');

      if (notification && estado === "Aceptado") {
        const shipmentResponse = await fetch("/api/auth/envio", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            usuario: notification.usuario?._id,
            desde: notification.desde,
            hasta: notification.hasta,
            cuando: notification.cuando,
            producto: notification.producto,
            recibe: notification.recibe,
            driver: notification.driver?._id,
          }),
        });
        if (!shipmentResponse.ok) {
          throw new Error("Failed to create shipment");
        } else {
          Swal.fire({
            icon: "success",
            title: "El producto fue aceptado",
            confirmButtonColor: "#fe1252",
            confirmButtonText: "Aceptar",
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate.back();
            }
          });
        }

        const shipmentData = await shipmentResponse.json();
        //console.log('shipment creado',shipmentData);
        //crear el envio
        // Create shipment
        // Add shipment to the trip

        const updateResponse = await fetch("/api/auth/viajes", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify({
            viajeId: notification.driver?._id,
            data: shipmentData,
            prod: shipmentData.producto,
          }),
        });

        if (!updateResponse.ok) {
          throw new Error("Failed to update trip with shipment");
        }

        const updated = await updateResponse.json();
        console.log(updated, "soy updated");

        //pagar
        const pago = await fetch("/api/auth/pagar", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            userId: notification.usuario?._id,
            total: notification?.total,
            driver: notification.driver?.usuario,
            envio: shipmentData._id,
          }),
        });
        const ansPago = await pago.json();
        //console.log(pago, 'im the pago ctm!!', ansPago);
        pago.ok ? setSuccess(true) : setPayment(true);
      } else {
        setRejected(true);
      }
      notification &&
        notification.usuario &&
        notification.estado &&
        sendNotification(notification.usuario._id, {
          content: notification.estado,
        });
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useRouter();
  useEffect(() => {
    fetchNotification();
  }, []);
  return (
    <div className="w-screen flex flex-col  overflow-auto mb-20   justify-center items-center">
      {notification ? (
        <div className=" flex gap-y-5 h-full  flex-col items-center">
          <div className="w-full flex flex-col p-5 justify-start h-20">
            <button className="text-3xl" onClick={navigate.back}>
              <MdKeyboardArrowLeft />
            </button>
            <h2 className="text-xl sm:text-2xl sm:ml-20 font-bold ml-5">
              Solicitud de <b>{notification.usuario?.fullname}</b>
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
          <div className=" flex flex-col gap-y-4   rounded-xl h-fit bg-gray-50  shadow-md  items-center sm:h-60 p-5 sm:w-[450px] sm:p-0   w-[380px]">
            <p>Información del producto</p>
            <div className="flex flex-row w-full   justify-evenly items-center gap-x-2 ">
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
                className="p-1 rounded-md shadow-sm  cursor-pointer w-40 h-44 object-contain  shadow-gray-500 "
                src={notification.producto?.photoProduct}
                alt={notification.producto?.name}
              />
            </div>
          </div>

          <div className="flex justify-center p-5 gap-x-4 w-full">
            <Button
              onClick={() => response("Aceptado", notification._id!)}
              className="bg-pink text-white disabled:opacity-50 disabled:cursor-not-allowed"
              //disabled={disabledAceptar}
            >
              Aceptar Solicitud
            </Button>
            <Button
              onClick={() => response("Rechazado", notification._id!)}
              className="bg-pink text-white"
            >
              Cancelar Solicitud
            </Button>
          </div>
        </div>
      ) : (
        <div>Cargando...</div>
      )}
      {success && (
        <div className="fixed top-0 z-10 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl">
            <Accepted />
          </div>
        </div>
      )}
      {rejected && (
        <div className="fixed top-0 z-10 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl">
            <Rejected />
          </div>
        </div>
      )}
      {payment && (
        <div className="fixed top-0 z-10 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl">
            <RejectedPayment />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
