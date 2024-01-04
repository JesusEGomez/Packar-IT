"use client";
import React, { useState } from "react";
import BottmBar from "../components/bottmBar";
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

const Loged = () => {
  const [fromModalOpen, setFromModalOpen] = useState(false);
  const [toModalOpen, setToModalOpen] = useState(false);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [date, setDate] = React.useState<Date | null>(null);
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [prodModal, setProdModal] = React.useState(false);

  const fromHandler = () => {
    setFromModalOpen(true);
  };

  const closeModal = (fromSelected: any) => {
    setFromModalOpen(false);
    setFrom(fromSelected);
  };

  const toHandler = () => {
    setToModalOpen(true);
  };

  const toModelClose = (toSelected: any) => {
    setToModalOpen(false);
    setTo(toSelected);
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
  const closeProdModal = () => {
    setProdModal(false);
  };
  return (
    <div className="flex flex-col items-center bg-pink">
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
      <div className="z-10 fixed top-48 left-1/2 transform -translate-x-1/2 w-full md:w-auto md:max-w-3xl bg-white border rounded-xl high-1-screen">
        <div className="flex flex-col items-center gap-y-4 p-4 md:p-8">
          <h1 className="font-bold mt-2">¿Qué deseas enviar?</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              className="flex text-slate-400 gap-x-4 border-b p-2"
              onClick={fromHandler}
            >
              {<RiMapPinAddLine size={30} />}
              {from === null ? "Desde" : "hola"}
            </button>
            <button
              className="flex text-slate-400 gap-x-4 border-b p-2"
              onClick={toHandler}
            >
              <RiMapPin2Fill size={30} />
              Hasta
            </button>
            <button className="flex text-slate-400 gap-x-4 border-b p-2">
              <FaRegCalendarAlt size={30} />
              Cuando
            </button>
            <button className="flex text-slate-400 gap-x-4 border-b p-2">
              <BsBoxSeam size={30} />
              Producto
            </button>
          </div>

          <button className="bg-pink w-full text-white font-bold rounded-b-xl p-3">
            Buscar
          </button>
        </div>
      </div>

      <div className="absolute bottom-0">
        <BottmBar />
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
export default Loged;
