"use client";
import React, { useEffect, useState } from "react";
import logo from "../../img/undraw_Deliveries_2r4y.png";
import Image from "next/image";
import { RiMapPinAddLine } from "react-icons/ri";
import { RiMapPin2Fill } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import MapComponent from "../components/MapComponent";
import { getFormattedAddress } from "../api/components/components";
import { Calendar } from "@/components/ui/calendar";
import { ProdModal } from "../components/ProdModal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import SelectDriver from "../components/SelectDriver";
import QuienEnvia from "../components/QuienEnvia";

type prod = {
  types: any;
  name: string;
  size: any;
  weight: any;
};
export interface FormInputs {
  ciudadOrigen: string;
  paisOrigen: string;
  ciudadDestino: string;
  paisDestino: string;
}

// const response = await fetch('/api/auth/envio',{
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   method: 'POST',
//   body: JSON.stringify({
//     desde: {
//       from,
//       ciudad: formData?.ciudadOrigen,
//       pais: formData?.paisOrigen
//     },
//     hasta: {
//       to,
//       ciudad: formData?.ciudadDestino,
//       pais: formData?.paisDestino
//     },
//     cuando: date,
//     producto: selectedProductData,
//   })
// });
// const data = await response.json();

const Loged = () => {
  const [fromModalOpen, setFromModalOpen] = useState(false);
  const [toModalOpen, setToModalOpen] = useState(false);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [prodModal, setProdModal] = React.useState(false);
  const [selectedProductData, setSelectedProductData] = useState<prod | null>(
    null
  );
  const [paisOrigen, setPaisOrigen] = React.useState<string | null>(null);
  const [paisDestino, setPaisDestino] = React.useState<string | null>(null);
  const [search, setSearch] = useState(false);
  const [selectdriverOpen, setSelectdriverOpen] = useState(false);
  const [driver, setDriver] = useState(null);
  const { data: session } = useSession();
  const [ciudadOrigen, setCiudadOrigen] = useState<string | null>(null);
  const [ciudadDestino, setCiudadDestino] = useState<string | null>(null);
  const [receptor, setReceptor] = useState<boolean | null>(false);
  const [receptorInfo, setReceptorInfo] = useState<any>(null);

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

  const toModelClose = async (toSelected: any) => {
    setToModalOpen(false);
    const toLocation = await getFormattedAddress(toSelected);
    setTo(toLocation);
  };
  const calendarHandler = () => {
    setCalendarOpen(!calendarOpen);
  };
  const changeDateFormat = (date: Date) => {
    if (date) {
      const newDate = date.toString().slice(0, 15);
      return newDate;
    }
  };
  const productsHandler = () => {
    setProdModal(true);
  };
  const closeProdModal = (selectedProductData: any) => {
    setProdModal(false);
    setSelectedProductData(selectedProductData);
  };
  const closeSelectDriver = (data: any) => {
    setSelectdriverOpen(false);
    setDriver(data);
  };
  const navigate = useRouter();
  const searchHandler = () => {
    setSelectdriverOpen(true);
  };
  const receptorOpen = () => {
    setReceptor(true);
  };
  const receptorClose = (data: any) => {
    setReceptorInfo(data);
    setReceptor(false);
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

    const newEnvio = {
      desde: { calle: from, pais: paisOrigen, ciudad: ciudadOrigen },
      hasta: { calle: to, pais: paisDestino, ciudad: ciudadDestino },
      cuando: date,
      producto: selectedProductData,
    };
  };
  useEffect(() => {
    !session && navigate.push("/prelogin/register/login");

    from && to && date && selectedProductData && setSearch(true);
  }, [from, to, date, selectedProductData]);

  return (
    <div className="flex flex-col items-center bg-pink md:flex-row">
      <Image
        className="my-16 rounded-full"
        src={logo}
        alt="logo"
        width={150}
        height={150}
      />
      <div className="bg-white w-full rounded-t-3xl pt-10">
        {/* Contenido del segundo div */}
      </div>
      <div className="z-10 fixed top-48 left-20 right-20 bg-white border rounded-xl">
        <h1 className="font-bold text-2xl mt-2">¿Que deseas enviar?</h1>
        <div className="flex flex-col text-center items-center gap-y-4">
          <form
            className="flex  flex-col items-center gap-y-2 p-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex  justify-center items-center gap-y-5 ">
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
              <div className="flex flex-col items-center gap-y-4">
                <button
                  className="flex text-slate-400 gap-x-4 border-b p-2 mx-4 w-full md:w-auto"
                  onClick={fromHandler}
                >
                  {<RiMapPinAddLine size={30} />}
                  {from === null ? "Dirección Origen" : `${from}`}
                </button>

                <button
                  className="flex text-slate-400 gap-x-4 border-b p-2 mx-4 w-full md:w-auto"
                  onClick={toHandler}
                >
                  <RiMapPin2Fill size={30} />
                  {to === null ? "Dirección Destino" : `${to}`}
                </button>
                <button
                  onClick={() => calendarHandler()}
                  className="flex text-slate-400 gap-x-4 border-b p-2 mx-4 w-full md:w-auto"
                >
                  <FaRegCalendarAlt size={30} />
                  {date ? `${changeDateFormat(date)}` : "Cuando"}
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
                  onClick={() => productsHandler()}
                  className="flex text-slate-400 gap-x-4 border-b p-2 mx-4 w-full md:w-auto"
                >
                  <BsBoxSeam size={30} />
                  {selectedProductData
                    ? `${selectedProductData.name}`
                    : "Producto"}
                </button>
              </div>
              <div className="flex  items-center gap-y-4">
                <button
                  className="bg-pink w-full disabled:opacity-70 text-white font-bold rounded-b-xl p-3"
                  onClick={() => receptorOpen()}
                >
                  Datos del Receptor
                </button>
                <button
                  onClick={() => searchHandler()}
                  className="bg-pink w-full disabled:opacity-70 text-white font-bold rounded-b-xl p-3"
                  disabled={!search}
                >
                  Buscar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

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
      {prodModal && (
        <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl">
            <ProdModal closeModal={closeProdModal} />
          </div>
        </div>
      )}
      {receptor && (
        <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl">
            <QuienEnvia closeModal={receptorClose} />
          </div>
        </div>
      )}
      {selectdriverOpen && (
        <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl">
            <SelectDriver
              close={closeSelectDriver}
              open={selectedProductData}
              ciudadOrigen={ciudadOrigen}
              ciudadDestino={ciudadDestino}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default Loged;
