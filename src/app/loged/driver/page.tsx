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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

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
  salida: string;
  llegada: string;
};

const Driver = () => {
  const [fromModalOpen, setFromModalOpen] = useState(false);
  const [timeModalOpen, setTimeModalOpen] = useState(false);
  const [toModalOpen, setToModalOpen] = useState(false);
  const [flex, setFlex] = useState(false);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [time, setTime] = useState<time>({ salida: "", llegada: "" });
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [prodModal, setProdModal] = React.useState(false);
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

  const searchHandler = () => {
    console.log(selectedProductData);
    const newTravel = {
      from,
      to,
      date,
      precio: [
        selectedProductData.pequeño,
        selectedProductData.mediano,
        selectedProductData.grande,
      ],
      time,
      flex,
    };
    console.log("nuevoViaje", newTravel);
  };
  useEffect(() => {
    flex &&
      time &&
      from &&
      to &&
      date &&
      selectedProductData &&
      setSearch(true);
    console.log("flex", flex);
  }, [flex, from, to, date, selectedProductData, time]);

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

          <button
            onClick={() => timeHandler()}
            className="flex items-center text-slate-400 gap-x-4 border-b p-2 mx-4"
          >
            <IoTime size={30} />
            {time === null ? (
              "Hora "
            ) : (
              <div className="flex flex-col">
                <p>{`Salida: ${time.salida}`} </p>
                <p>{`Llegada: ${time.llegada}`}</p>
              </div>
            )}
          </button>
          <button
            onClick={() => productsHandler()}
            className="flex text-slate-400 gap-x-4 border-b p-2 mx-4 w-full md:w-auto"
          >
            <BsBoxSeam size={30} />
            {selectedProductData ? "Elección Cargada" : "Producto"}
          </button>

          <div className="flex items-center text-slate-400 space-x-2">
            <Checkbox onClick={() => setFlex(!flex)} id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              ¿Eres flexible?
            </label>
          </div>

          <div className="flex text-xl w-full justify-center text-black   border-b p-2 mx-4"></div>

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
    </div>
  );
};
export default Driver;
