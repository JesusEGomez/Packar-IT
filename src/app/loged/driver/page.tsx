"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RiMapPinAddLine } from "react-icons/ri";
import { RiMapPin2Fill } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { useSession } from "next-auth/react";
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
import { Separator } from "@/components/ui/separator";

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
  special: boolean;
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
  cuando: string | undefined;
  eresFlexible: boolean;
  estado: boolean;
  envios: [];
  special: boolean;
}

const Driver = () => {
  const [fromModalOpen, setFromModalOpen] = useState(false);
  const [timeModalOpen, setTimeModalOpen] = useState(false);
  const [toModalOpen, setToModalOpen] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [finalStep, setFinalStep] = useState(false);
  const [flex, setFlex] = useState(false);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
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

    cuando: undefined,

    eresFlexible: true,

    estado: false,
    envios: [],
    special: false,
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
    special: false,
  });
  const { user } = useUserState((state) => state);

  const fromHandler = () => {
    setFromModalOpen(true);
  };

  const closeModal = async (fromSelected: google.maps.LatLngLiteral) => {
    setFromModalOpen(false);
    const fromLocation = await getFormattedAddress(fromSelected);
    setFrom(fromLocation);
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
    console.log("tiempo", timeSelected);
    setTimeModalOpen(false);
    setTime(timeSelected);
  };
  const toModelClose = async (toSelected: google.maps.LatLngLiteral) => {
    console.log(toSelected);
    setToModalOpen(false);
    const toLocation = await getFormattedAddress(toSelected);
    setTo(toLocation);
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

  const closePropModalHandler = () => {
    setProdModal(false);
  };

  useEffect(() => {
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

    console.log("flex", ciudadOrigen);
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
  console.log("Boton", hoverButton);
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    setCiudadOrigen(data?.ciudadOrigen.replaceAll(" ", "_"));
    setCiudadDestino(data?.ciudadDestino.replaceAll(" ", "_"));
    setPaisOrigen(data?.paisOrigen.replaceAll(" ", "_"));
    setPaisDestino(data?.paisDestino.replaceAll(" ", "_"));

    console.log("Productos", selectedProductData);
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
      ],
      horaSalida: time.salida,
      horaLlegada: time.llegada,
      cuando: stringDate,
      eresFlexible: flex,
      estado: true,
      envios: [],
      special: selectedProductData.special,
    };

    search && setTravel(newTravel);
    console.log("nuevoViaje", newTravel);
    search && hoverButton && setFinalStep(true);
  };


  

  return (
    <div className="flex flex-col  w-full    items-center bg-pink">
      <Image
        className="my-16  rounded-full"
        src={"/step-3.svg"}
        alt="logo"
        width={250}
        height={250}
      />
      <div className="bg-white  rounded-t-3xl">
      
      </div>
      <form
        className="flex w-full justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
       <div className="z-10 fixed flex top-56 sm:w-full md:w-3/4 lg:w-1/2 xl:w-1/3 bg-white border rounded-xl p-4">
          <div className="flex flex-col  h-1/2 items-center gap-y-2">
            <h1 className="font-bold mt-2">¿A donde vas a viajar ?</h1>
            <div className="flex flex-col   items-center">
              <div className="flex flex-col  items-center gap-y-2 p-2  ">
                <div className=" justify-between w-screen  sm:w-full items-center mx-2   flex">
                  <div className="grid w-1/2 h-20  max-w-sm items-center ">
                    <label className="text-sm text-gray-500" htmlFor="ciudadOrigen">
                      Ciudad de origen
                    </label>
                    <input
                      type="text"
                      className=" p-2 w-full border-b text-sm text-gray-500"
                      id="ciudadOrigen"
                      {...register("ciudadOrigen", {
                        required: "Este campo es requerido",
                      })}
                    />
                  </div>
                  <Separator className="mx-3" orientation="vertical" />
                  <div className="grid w-1/2 h-20  max-w-sm items-center ">
                    <label className="text-sm text-gray-500" htmlFor="paisOrigen">
                      País de origen
                    </label>
                    <input
                      type="text"
                      className="  p-2 w-full border-b text-sm text-gray-500"
                      id="paisOrigen"
                      {...register("paisOrigen", {
                        required: "Este campo es requerido",
                      })}
                    />
                  </div>
                </div>
                <div className=" justify-between  w-screen sm:w-full items-center mx-2  flex">
                  <div className="grid w-1/2 h-20  max-w-sm items-center">
                    <label className="text-gray-500" htmlFor="ciudadDestino">
                      Ciudad de Destino
                    </label>
                    <input
                      type="text"
                      className=" p-2 w-full border-b text-sm text-gray-500"
                      id="ciudadDestino"
                      {...register("ciudadDestino", {
                        required: "Este campo es requerido",
                      })}
                    />
                  </div>
                  <Separator className="mx-2" orientation="vertical" />
                  <div className="grid w-1/2 h-20  max-w-sm items-center">
                    <label className="text-sm text-gray-500" htmlFor="paisDestino">
                      País de Destino
                    </label>
                    <input
                      type="text"
                      className=" p-2 w-full border-b text-sm text-gray-500"
                      id="paisDestino"
                      {...register("paisDestino", {
                        required: "Este campo es requerido",
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full  flex-col items-center  ">
                <div className=" justify-between items-center  mx-2  flex">
                  <button
                    className="flex text-slate-400 h-14 w-full justify-center  border-b p-2 mx-4"
                    onClick={fromHandler}
                  >
                    {<RiMapPinAddLine size={30} />}
                    {from === null ? "Desde:Calle" : `${from}`}
                  </button>

                  <button
                    className="flex text-slate-400 w-full h-14   border-b p-2 mx-4"
                    onClick={toHandler}
                  >
                    <RiMapPin2Fill size={30} />
                    {to === null ? "Hasta:Calle" : `${to}`}
                  </button>
                </div>
                <div className=" justify-between items-center  mx-2  flex">
                  <button
                    onClick={() => dateModalClose()}
                    className="flex text-slate-400 h-14 gap-x-4 border-b p-2 mx-4"
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
                    onClick={() => timeHandler()}
                    className="flex items-center h-14 text-slate-400 gap-x-4 border-b p-2 mx-4"
                  >
                    <IoTime size={30} />
                    {time === null ? (
                      "Hora "
                    ) : (
                      <div className="flex flex-col">
                        <p>{`Salida: ${time?.salida ? time.salida : ""}`} </p>
                        <p>{`Llegada: ${time?.llegada ? time.llegada : ""}`}</p>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => productsHandler()}
              className="flex text-slate-400 gap-x-4 justify-center border-b p-2 mx-4 w-full md:w-auto"
            >
              <BsBoxSeam size={30} />
              {productSelected ? "Elección Cargada" : "Producto"}
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
              type="submit"
              onMouseEnter={() => setHoverButton(true)}
              onMouseLeave={() => setHoverButton(false)}
              onSubmit={handleSubmit(onSubmit)}
              className="bg-pink w-full disabled:opacity-70  text-white font-bold rounded-b-xl p-3"
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