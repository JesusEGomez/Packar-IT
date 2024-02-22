"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RiMapPinAddLine, RiMapPin2Fill } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import MapComponent from "@/app/components/MapComponent";
import { getFormattedAddress } from "@/app/api/components/components";
import TimeForm from "@/app/components/timeForm";
import { IoTime } from "react-icons/io5";
import { SendProduct } from "@/app/components/sendProduct";
import { Checkbox } from "@/components/ui/checkbox";
import { FormInputs } from "../page";
import { SubmitHandler, useForm } from "react-hook-form";
import FinalDriverModal from "@/app/components/FinalStepDriverModal";
import useUserState from "@/app/store/sotre";
import DateModal from "@/app/components/DateModal";
import { useSession } from "next-auth/react";
import { IProfile } from "@/app/interfaces/profile.interface";

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
  especial: {
    quantity: number;
    price: number;
  };
  special: boolean;
};

type time = {
  salida: string | null | undefined;
  llegada: string | null | undefined;
};

export interface ITravel {
  userId: string;
  desde: { calle: string | null; pais: string | null; ciudad: string | null };
  hasta: { calle: string | null; pais: string | null; ciudad: string | null };
  precio: [
    { quantity: number | null; price: number | null },
    { quantity: number | null; price: number | null },
    { quantity: number | null; price: number | null },
    { quantity: number | null; price: number | null }
  ];
  horaSalida: string | null | undefined;
  horaLlegada: string | null | undefined;
  cuando: string | undefined;
  eresFlexible: boolean;
  estado: string;
  envios: [];
  special: boolean;
  como: string;
}

const Driver = () => {
  const [fromModalOpen, setFromModalOpen] = useState(false);
  const [timeModalOpen, setTimeModalOpen] = useState(false);
  const [toModalOpen, setToModalOpen] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [finalStep, setFinalStep] = useState(false);
  const [flex, setFlex] = useState(false);
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [time, setTime] = useState<time>({ salida: null, llegada: null });
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [prodModal, setProdModal] = React.useState(false);
  const [ciudadOrigen, setCiudadOrigen] = useState<string | null>(null);
  const [ciudadDestino, setCiudadDestino] = useState<string | null>(null);
  const [paisOrigen, setPaisOrigen] = useState<string | null>(null);
  const [paisDestino, setPaisDestino] = useState<string | null>(null);
  const [search, setSearch] = useState(false);
  const [productSelected, setProductSelected] = useState(false);
  const [hoverButton, setHoverButton] = useState(false);
  const [hoverSelectButton, setHoverSelectButton] = useState(false);
  const { data: session } = useSession();

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
      {
        quantity: 0,
        price: 0,
      },
    ],
    horaSalida: "",

    horaLlegada: "",

    cuando: undefined,

    eresFlexible: true,

    estado: "Pendiente",
    envios: [],
    special: false,
    como: "",
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
    especial: {
      quantity: 0,
      price: 0,
    },
    special: false,
  });
  const { user, fetchUser, profile } = useUserState((state) => state);

  const fromHandler = () => {
    setFromModalOpen(true);
  };

  const isFromSelected = from !== null;

  const buttonClassName = `flex items-center  gap-x-4 border-b p-1 mx-4 w-72 2xl:w-96 2xl:p-3 md:p-2 ${
    isFromSelected ? "text-black-500" : "text-slate-400"
  }`;

  const closeModal = async (fromSelected: google.maps.LatLngLiteral) => {
    setFromModalOpen(false);
    const fromLocation = await getFormattedAddress(fromSelected);
    const fromArray = fromLocation.split(",");
    const extractCity = (str: string) => str.replace(/[\d\s\W]+/g, "").trim();
    const city = fromArray[1].trim().replaceAll(" ", "-");
    setCiudadOrigen(city);
    setPaisOrigen(fromArray[fromArray.length - 1]);
    setFrom(fromArray[0]);
  };
  const closeMapModal = () => {
    setFromModalOpen(false);
    setToModalOpen(false);
  };

  const dateModalHandler = (date: Date) => {
    setDate(date);
    setDateModalOpen(!dateModalOpen);
  };

  const dateModalClose = () => {
    setDateModalOpen(!dateModalOpen);
  };

  const toHandler = () => {
    setToModalOpen(true);
  };
  const timeHandler = () => {
    setTimeModalOpen(true);
  };

  const TimeModelClose = async (timeSelected: any) => {
    if (
      timeSelected &&
      timeSelected.salida !== undefined &&
      timeSelected.llegada !== undefined
    ) {
      setTime({
        salida: timeSelected.salida ?? null,
        llegada: timeSelected.llegada ?? null,
      });
    }
    setTimeModalOpen(false);
  };
  const toModelClose = async (toSelected: google.maps.LatLngLiteral) => {
    setToModalOpen(false);
    const toLocation = await getFormattedAddress(toSelected);
    const toArray = toLocation.split(",");
    const extractCity = (str: string) => str.replace(/[\d\s\W]+/g, "").trim();
    const city = toArray[1].trim().replaceAll(" ", "-");
    setCiudadDestino(city);
    setPaisDestino(toArray[toArray.length - 1]);
    setTo(toArray[0]);
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

    //console.log(selectedProductData);
  };

  const closePropModalHandler = () => {
    setProdModal(false);
  };

  useEffect(() => {
    fetchUser(session?.user?.email!);

    if (
      productSelected &&
      time?.llegada &&
      time?.salida &&
      from &&
      to &&
      date &&
      selectedProductData
    ) {
      setSearch(true);
    } else {
      setSearch(false);
    }
  }, [productSelected, flex, from, to, date, selectedProductData, time]);

  const felxhandler = () => {
    setFlex(!flex);
    const editFlex = { ...travel, eresFlexible: !flex };
    setTravel(editFlex);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    //console.log(data);

    //console.log("Productos", selectedProductData);
    const stringDate = date?.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const newTravel: ITravel = {
      userId: user._id,
      desde: { calle: from, pais: paisOrigen, ciudad: ciudadOrigen },
      hasta: { calle: to, pais: paisDestino, ciudad: ciudadDestino },
      precio: [
        selectedProductData.pequeño,
        selectedProductData.mediano,
        selectedProductData.grande,
        selectedProductData.especial,
      ],
      horaSalida: time.salida,
      horaLlegada: time.llegada,
      cuando: stringDate,
      eresFlexible: flex,
      estado: "Pendiente",
      envios: [],
      special: selectedProductData.special,
      como: data.como,
    };
    search && setTravel(newTravel);
    //console.log("nuevoViaje", newTravel);
    search && hoverButton && setFinalStep(true);
  };
  return (
    <div className="flex flex-col w-full max-h-screen items-center bg-pink overflow-y-auto">
      <Image
        className="my-8 rounded-full 2xl:my-10 2xl:w-[150px] 2xl:h-[150px]"
        src={"/step-3.svg"}
        alt="logo"
        width={150}
        height={150}
      />
      <div className="bg-white  rounded-t-3xl">
        {/* Contenido del segundo div */}
      </div>
      <form
        className="flex w-full justify-center "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="fixed top-32   bg-white border rounded-xl max-h-lvh 2xl:top-48 2xl:w-auto">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-xl mt-2">¿A dónde vas a viajar?</h1>
            <div className="flex flex-col text-center items-center">
              <button
                className={buttonClassName}
                onClick={fromHandler}
                title={from || undefined}
              >
                <RiMapPinAddLine size={30} />
                {from === null
                  ? "Dirección Origen"
                  : from.length > 20
                  ? `${from.slice(0, 15)}.....`
                  : `${from}`}
              </button>
              <button
                className={`flex items-center  gap-x-4 border-b p-1 mx-4 w-72 2xl:w-96 2xl:p-3 md:p-2${
                  to === null ? "text-slate-400" : "text-black-500"
                }`}
                onClick={toHandler}
                title={to || undefined}
              >
                <RiMapPin2Fill size={30} />
                {to === null
                  ? "Dirección Destino"
                  : to.length > 20
                  ? `${to.slice(0, 15)}.....`
                  : `${to}`}
              </button>
              <button
                onClick={() => dateModalClose()}
                className={`flex items-center gap-x-4 border-b p-1 mx-4 w-72 2xl:w-96 2xl:p-3 md:p-2 ${
                  date ? "text-black-500" : "text-slate-400"
                }`}
              >
                <FaRegCalendarAlt size={30} />
                {date
                  ? `${date.toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}`
                  : "Cuando"}
              </button>
              <button
                className={`flex items-center gap-x-4 border-b p-1 mx-4 w-72 2xl:w-96 2xl:p-3 md:p-2${
                  time !== null && time.salida !== null && time.llegada !== null
                    ? "text-black-500"
                    : "text-slate-400"
                }`}
                onClick={() => timeHandler()}
              >
                <IoTime size={30} />
                {time === null ? (
                  "Hora "
                ) : (
                  <p>
                    {`Salida ${time?.salida ? time.salida : ""}`} -{" "}
                    {`Llegada ${time?.llegada ? time.llegada : ""}`}
                  </p>
                )}
              </button>
              <button
                onClick={() => productsHandler()}
                className={`flex items-center p-1 gap-x-4 border-b  mx-4 w-72 2xl:w-96 2xl:p-3 md:p-2 ${
                  productSelected ? "text-black-500" : "text-slate-400"
                }`}
              >
                <BsBoxSeam size={30} />
                {productSelected ? "Elección Cargada" : "Producto"}
              </button>
              <div
                onMouseEnter={() => setHoverSelectButton(true)}
                onMouseLeave={() => setHoverSelectButton(false)}
                className="flex items-center text-slate-400 p-0.6 gap-x-4 border-b p-1 mx-4 w-72 2xl:w-96 2xl:p-3 md:p-2"
              >
                <select
                  className="p-1 rounded bg-white text-slate-400 text-center w-full"
                  disabled={!hoverSelectButton}
                  id="como"
                  {...register("como", {
                    required: { value: true, message: "Campo requerido" },
                  })}
                >
                  <option value="" disabled selected>
                    ¿Cómo viajas?
                  </option>
                  <option value="auto">Auto</option>
                  <option value="avion">Avión</option>
                  <option value="bus">Bus</option>
                  <option value="motocicleta">Motocicleta</option>
                  <option value="tren">Tren</option>
                </select>
              </div>
            </div>
            <div className="flex text-slate-400 gap-x-4 justify-center p-2 mx-4 w-64">
              <Checkbox onClick={felxhandler} id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                ¿Eres flexible?
              </label>
            </div>
            <button
              type="submit"
              onMouseEnter={() => setHoverButton(true)}
              onMouseLeave={() => setHoverButton(false)}
              onSubmit={handleSubmit(onSubmit)}
              className="bg-pink w-full disabled:opacity-70 text-white font-bold rounded-b-xl p-1"
              disabled={
                !search ||
                !profile ||
                profile.account.state !== "approved" ||
                profile.phoneNumber.length < 9
              }
            >
              Crear
            </button>
          </div>
          {profile?.phoneNumber && profile.phoneNumber.length < 9 && (
            <div className="w-full  text-center p-1 text-red-600">
              <p>
                Debes tener un Numero de Teléfono valido para crear un envió
              </p>
            </div>
          )}
          {profile?.account.state !== "approved" && (
            <div className="w-full  text-center p-1 text-red-600">
              <p>Debes tener una cuenta aprobada para poder crear un viaje</p>
            </div>
          )}
        </div>
      </form>

      {fromModalOpen && (
        <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl">
            <MapComponent
              closeMapModal={closeMapModal}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
      {toModalOpen && (
        <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl">
            <MapComponent
              closeMapModal={closeMapModal}
              closeModal={toModelClose}
            />
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
            <SendProduct
              closePropModalHandler={closePropModalHandler}
              closeModal={closeProdModal}
              setProductSelected={setProductSelected}
            />
          </div>
        </div>
      )}
      {finalStep && (
        <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white  p-4 rounded-xl">
            <FinalDriverModal
              travel={travel}
              flexHandle={felxhandler}
              closeModal={finalStepClose}
              flex={flex}
            />
          </div>
        </div>
      )}
      {dateModalOpen && (
        <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl">
            <DateModal
              date={date!}
              dateModalClose={dateModalClose}
              dateModalHandler={dateModalHandler}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default Driver;
