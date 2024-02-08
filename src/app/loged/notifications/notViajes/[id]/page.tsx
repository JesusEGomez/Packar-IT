"use client";
import { INotification } from "@/app/interfaces/notifications.interface";
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FiMapPin } from "react-icons/fi";
import { IoTime } from "react-icons/io5";
import { CalendarDays, CheckCircle2, XCircle } from "lucide-react";
import { toDate } from "date-fns";

const Page = ({ params }: { params: { id: string } }) => {
  const Prueba: INotification = {
    type: "solicitudDriver", //? Si es solicitudDriver es para el conductor y si es solicitudProduct es para el solicitante la notificación
    usuario: "65b2cee6d11c0c635e89bd97",
    desde: {
      calle: "17 Santiago Humberstone",
      pais: " Chile",
      ciudad: "Antofagasta",
    },
    hasta: {
      calle: "2799 Santiago Humberstone",
      pais: " Chile",
      ciudad: "Calama",
    },
    cuando: toDate("2024-02-08T03:00:00.000Z"),
    producto: {
      _id: "1",
      type: "Special",
      name: "rrrr",
      size: "12x12x12",
      weigth: "12",
      photoProduct:
        "https://res.cloudinary.com/dezg8rinp/image/upload/v1707314359/ProjectsImages/nvscetexyq8xjteccbfd.png",
      articulosEspeciales: "rrrr",
    },
    recibe: {
      nombreApellidos: "c",
      telefono: "123",
      email: "cleivaj93@gmail.com",
    },
    driver: {
      _id: "65c2b9821356b6a13d283c5b",
      usuario: {
        _id: "65c22715e1fdf7fb91000d05",
        email: "cleivaj93@gmail.com",

        fullname: "cesar leiva jimenez",
        smsCode: "",
      },
      desde: { pais: " Chile", ciudad: "Antofagasta", calle: "1202 Antilhue" },
      hasta: { pais: " Chile", ciudad: "Calama", calle: "2313 Arturo Prat" },
      cuando: "07/02/2024",
      horaSalida: "15:15",
      horaLlegada: "16:16",
      eresFlexible: false,
      estado: "Pendiente",
      precio: [[], [], [], []],
      envios: [],
      special: true,
      como: "auto",
    },
  };
  const [notification, setNotification] = useState<INotification | null>();
  const navigate = useRouter();
  useEffect(() => {
    setNotification(Prueba);
  }, []);
  return (
    <div className="w-screen flex flex-col justify-center items-center">
      {notification ? (
        <div className=" flex gap-y-5  flex-col items-center">
          <div className="w-full flex flex-col p-5 justify-start h-20">
            <button className="text-3xl" onClick={navigate.back}>
              <MdKeyboardArrowLeft />
            </button>
            <h2 className="text-xl sm:text-2xl sm:ml-20 font-bold ml-5">
              Solicitud de <b>Jose</b>
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
          <div className=" flex flex-col gap-y-4 rounded-xl bg-gray-50  shadow-md  items-center sm:h-52  p-4  w-[350px]">
            <p>Información del producto</p>
            <div className="flex w-full justify-center gap-x-2 ">
              <div>
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
                width={150}
                height={150}
                src={notification.producto?.photoProduct}
                alt={notification.producto?.name}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-3"></div>
          <div className="flex justify-center gap-x-4 w-full">
            <Button className="bg-pink text-white">Aceptar Solicitud</Button>
            <Button className="bg-pink text-white">Cancelar Solicitud</Button>
          </div>
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
};

export default Page;
