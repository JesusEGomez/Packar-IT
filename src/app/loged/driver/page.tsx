"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RiMapPinAddLine } from "react-icons/ri";
import { RiMapPin2Fill } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import MapComponent from "@/app/components/MapComponent";
import { ProdModal } from "@/app/components/ProdModal";
import { getFormattedAddress } from "@/app/api/components/components";
import TimeForm from "@/app/components/timeForm";
import { IoTime } from "react-icons/io5";
import { SendProduct } from "@/app/components/sendProduct";
import { Checkbox } from "@/components/ui/checkbox";
import { FormInputs } from "../page";
import { SubmitHandler, useForm } from "react-hook-form";
import FinalDriverModal from "@/app/components/FinalStepDriverModal";
import useUserState from "@/app/store/sotre";

type prod = {
  pequeño: {
    quantity: number;
    price: number;
  };
  mediano: {
    quantity: number;
    price: number;
  };
  grande: {
    quantity: number;
    price: number;
  };
};

type time = {
  salida: string | null;
  llegada: string | null;
};

export interface ITravel {
  userId: string;
  desde: { calle: string | null; pais: string | null; ciudad: string | null };
  hasta: { calle: string | null; pais: string | null; ciudad: string | null };
  precio: [
    { quantity: number | null; price: number | null },
    { quantity: number | null; price: number | null },
    { quantity: number | null; price: number | null }
  ];
  horaSalida: string | null;
  horaLlegada: string | null;
  cuando: { date: Date | undefined };
  eresFlexible: { flex: boolean };
  estado: boolean;
  envios: [];
}

const Driver = () => {
  const [fromModalOpen, setFromModalOpen] = useState(false);
  const [timeModalOpen, setTimeModalOpen] = useState(false);
  const [toModalOpen, setToModalOpen] = useState(false);
  const [finalStep, setFinalStep] = useState(false);
  const [flex, setFlex] = useState(false);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [time, setTime] = useState<time>({ salida: null, llegada: null });
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [prodModal, setProdModal] = React.useState(false);
  const [ciudadOrigen, setCiudadOrigen] = useState<string | null>(null);
  const [ciudadDestino, setCiudadDestino] = useState<string | null>(null);
  const [paisOrigen, setPaisOrigen] = useState<string | null>(null);
  const [paisDestino, setPaisDestino] = useState<string | null>(null);
  const [travel, setTravel] = useState<ITravel>({
    userId: "",
    desde: {
      calle: "",
      pais: "",
      ciudad: "",
    },
    hasta: {
      calle: "",
      pais: "",
      ciudad: "",
    },
    precio: [
      {
        quantity: 0,
        price: 0,
      },
      {
        quantity: 0,
        price: 0,
      },
      {
        quantity: 0,
        price: 0,
      },
    ],
    horaSalida: "",

    horaLlegada: "",

    cuando: {
      date: undefined,
    },
    eresFlexible: {
      flex: true,
    },
    estado: false,
    envios: [],
  });
  const [selectedProductData, setSelectedProductData] = useState<prod>({
    pequeño: {
      quantity: 0,
      price: 0,
    },
    mediano: {
      quantity: 0,
      price: 0,
    },
    grande: {
      quantity: 0,
      price: 0,
    },
  });
  const [search, setSearch] = useState(false);
  const { user } = useUserState((state) => state);

  const fromHandler = () => {
    setFromModalOpen(true);
  };

  const closeModal = async (fromSelected: any) => {
    setFromModalOpen(false);
    const fromLocation = await getFormattedAddress(fromSelected);
    setFrom(fromLocation);
  };

  const toHandler = () => {
    setToModalOpen(true);
  };
  const timeHandler = () => {
    setTimeModalOpen(true);
  };

  const TimeModelClose = async (timeSelected: any) => {
    console.log("tiempo", timeSelected);
    setTimeModalOpen(false);
    setTime(timeSelected);
  };
  const toModelClose = async (toSelected: any) => {
    setToModalOpen(false);
    const toLocation = await getFormattedAddress(toSelected);
    setTo(toLocation);
  };
  const calendarHandler = () => {
    setCalendarOpen(!calendarOpen);
  };

  const productsHandler = () => {
    setProdModal(true);
  };
  const finalStepClose = () => {
    setFinalStep(false);
  };
  const closeProdModal = (selectedProductData: any) => {
    setProdModal(false);
    setSelectedProductData(selectedProductData);
    console.log(selectedProductData);
  };
  const navigate = useRouter();

  useEffect(() => {
    flex &&
      time.llegada &&
      time.salida &&
      from &&
      to &&
      date &&
      selectedProductData &&
      setSearch(true);
    console.log("flex", flex);
  }, [
    ciudadOrigen,
    ciudadDestino,
    paisDestino,
    paisOrigen,
    flex,
    from,
    to,
    date,
    selectedProductData,
    time,
  ]);

  const felxhandler = () => {
    setFlex(!flex);
    const editFlex = { ...travel, eresFlexible: { flex: !flex } };
    setTravel(editFlex);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    setCiudadOrigen(data?.ciudadOrigen.replaceAll(" ", "_"));
    setCiudadDestino(data?.ciudadDestino.replaceAll(" ", "_"));
    setPaisOrigen(data?.paisOrigen.replaceAll(" ", "_"));
    setPaisDestino(data?.paisDestino.replaceAll(" ", "_"));

    console.log(selectedProductData);
    const newTravel: ITravel = {
      userId: user._id,
      desde: { calle: from, pais: paisOrigen, ciudad: ciudadOrigen },
      hasta: { calle: to, pais: paisDestino, ciudad: ciudadDestino },
      precio: [
        selectedProductData.pequeño,
        selectedProductData.mediano,
        selectedProductData.grande,
      ],
      horaSalida: time.salida,
      horaLlegada: time.llegada,
      cuando: { date },
      eresFlexible: { flex },
      estado: true,
      envios: [],
    };
    search && setTravel(newTravel);
    search && setFinalStep(true);
    console.log("nuevoViaje", newTravel);
  };

  return (
    <div className="flex flex-col  items-center bg-pink">
      <Image
        className="my-16 rounded-full"
        src={"/step-3.svg"}
        alt="logo"
        width={250}
        height={250}
      />
      <div className="bg-white w-full rounded-t-3xl">
        {/* Contenido del segundo div */}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="z-10 fixed left-0 w-full top-48  bg-white border rounded-xl">
          <div className="flex flex-col w-full  items-center gap-y-4">
            <h1 className="font-bold mt-2">¿A donde vas a viajar ?</h1>
            <div className="flex items-center">
              <div className="flex  flex-col items-center gap-y-5 ">
                <input
                  type="text"
                  placeholder="Ciudad de origen"
                  className="p-3 border-b text-slate-300"
                  id="ciudadOrigen"
                  {...register("ciudadOrigen")}
                />
                <input
                  type="text"
                  placeholder="País de origen"
                  className="p-3 border-b text-slate-300"
                  id="paisOrigen"
                  {...register("paisOrigen")}
                />
                <input
                  type="text"
                  placeholder="Ciudad de Destino"
                  className="p-3 border-b text-slate-300"
                  id="ciudadDestino"
                  {...register("ciudadDestino")}
                />
                <input
                  type="text"
                  placeholder="País de Destino"
                  className="p-3 border-b text-slate-300"
                  id="paisDestino"
                  {...register("paisDestino")}
                />
              </div>
              <div className="flex  flex-col items-center gap-y-2 ">
                <button
                  className="flex text-slate-400 justify-center gap-x-4 border-b p-2 mx-4"
                  onClick={fromHandler}
                >
                  {<RiMapPinAddLine size={30} />}
                  {from === null ? "Desde:Calle" : `${from}`}
                </button>
                <button
                  className="flex text-slate-400 gap-x-4 border-b p-2 mx-4"
                  onClick={toHandler}
                >
                  <RiMapPin2Fill size={30} />
                  {to === null ? "Hasta:Calle" : `${to}`}
                </button>
                <button
                  onClick={() => calendarHandler()}
                  className="flex text-slate-400 gap-x-4 border-b p-2 mx-4"
                >
                  <FaRegCalendarAlt size={30} />
                  {date
                    ? `${date.toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}`
                    : "Cuando"}
                  {calendarOpen && (
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                      disabled={(date: Date) => date < new Date()}
                    />
                  )}
                </button>

                <button
                  onClick={() => timeHandler()}
                  className="flex items-center text-slate-400 gap-x-4 border-b p-2 mx-4"
                >
                  <IoTime size={30} />
                  {time === null ? (
                    "Hora "
                  ) : (
                    <div className="flex flex-col">
                      <p>{`Salida: ${time.salida ? time.salida : ""}`} </p>
                      <p>{`Llegada: ${time.llegada ? time.llegada : ""}`}</p>
                    </div>
                  )}
                </button>
              </div>
            </div>
            <button
              onClick={() => productsHandler()}
              className="flex text-slate-400 gap-x-4 justify-center border-b p-2 mx-4 w-full md:w-auto"
            >
              <BsBoxSeam size={30} />
              {selectedProductData ? "Elección Cargada" : "Producto"}
            </button>

            <div className="flex items-center text-slate-400 space-x-2">
              <Checkbox onClick={felxhandler} id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                ¿Eres flexible?
              </label>
            </div>

            <div className="flex text-xl w-full justify-center text-black   border-b p-2 mx-4"></div>

            <button
              onSubmit={handleSubmit(onSubmit)}
              className="bg-pink w-full disabled:opacity-70 text-white font-bold rounded-b-xl p-3"
              disabled={!search}
            >
              Crear
            </button>
          </div>
        </div>
      </form>

      {fromModalOpen && (
        <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl">
            <MapComponent closeModal={closeModal} />
          </div>
        </div>
      )}
      {toModalOpen && (
        <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl">
            <MapComponent closeModal={toModelClose} />
          </div>
        </div>
      )}

      {timeModalOpen && (
        <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl">
            <TimeForm closeModal={TimeModelClose} />
          </div>
        </div>
      )}
      {prodModal && (
        <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl">
            <SendProduct closeModal={closeProdModal} />
          </div>
        </div>
      )}
      {finalStep && (
        <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl">
            <FinalDriverModal
              travel={travel}
              flexHandle={felxhandler}
              closeModal={finalStepClose}
              flex={flex}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default Driver;
