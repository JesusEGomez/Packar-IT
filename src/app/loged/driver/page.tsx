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

type prod = {
  types: any;
  name: string;
  size: any;
  weight: any;
};

const Driver = () => {
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
  const [search, setSearch] = useState(false);

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
    console.log(selectedProductData);
  };
  const navigate = useRouter();
  console.log("Coso del formulario", from);
  const searchHandler = async () => {
    const response = await fetch("/api/auth/envio", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        desde: from,
        hasta: to,
        cuando: date,
        producto: selectedProductData,
      }),
    });
    const data = await response.json();
    navigate.push("/loged/selectdriver");
  };
  useEffect(() => {
    from && to && date && selectedProductData && setSearch(true);
  }, [from, to, date, selectedProductData]);

  return (
    <div className="flex flex-col items-center bg-pink">
      <Image
        className="my-16 rounded-full"
        src={"/step-3.svg"}
        alt="logo"
        width={250}
        height={250}
      />
      <div className="bg-white w-full rounded-t-3xl pt-10">
        {/* Contenido del segundo div */}
      </div>
      <div className="z-10 fixed top-48 left-20 right-20 bg-white border rounded-xl">
        <div className="flex flex-col w-full items-center gap-y-4">
          <h1 className="font-bold mt-2">¿A donde vas a viajar ?</h1>
          <button
            className="flex text-slate-400 justify-center gap-x-4 border-b p-2 mx-4"
            onClick={fromHandler}
          >
            {<RiMapPinAddLine size={30} />}
            {from === null ? "Desde" : `${from}`}
          </button>
          <button
            className="flex text-slate-400 gap-x-4 border-b p-2 mx-4"
            onClick={toHandler}
          >
            <RiMapPin2Fill size={30} />
            {to === null ? "Desde" : `${to}`}
          </button>
          <button
            onClick={() => calendarHandler()}
            className="flex text-slate-400 gap-x-4 border-b p-2 mx-4"
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
          <div className="flex  flex-col text-slate-400 gap-x-4 border-b p-2 mx-4">
            <label htmlFor="tiemposalida">Hora de salida</label>
            <input id="tiemposalida" type="time"></input>
          </div>
          <div className="flex  flex-col text-slate-400  border-b p-2 mx-4">
            <label htmlFor="tiempoLlegada">Hora de Llegada</label>
            <input id="tiempoLlegada" type="time"></input>
          </div>
          <div className="flex text-xl w-full justify-center text-black   border-b p-2 mx-4"></div>

          <button
            onClick={() => productsHandler()}
            className="flex text-slate-400 gap-x-4 border-b p-2 mx-4"
          >
            <BsBoxSeam size={30} />
            {selectedProductData ? `${selectedProductData.name}` : "Producto"}
          </button>

          <button
            onClick={() => searchHandler()}
            className="bg-pink w-full disabled:opacity-70 text-white font-bold rounded-b-xl p-3"
            disabled={!search}
          >
            Crear
          </button>
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
    </div>
  );
};
export default Driver;
