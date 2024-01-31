"use client";
import React, { useEffect, useState } from "react";
import img from "../../img/undraw_Happy_feeling_re_e76r.png";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GiPathDistance } from "react-icons/gi";
import { FaUser } from "react-icons/fa";

type Viajes = [
  {
    desde: {
      pais: string;
      ciudad: string;
      calle: string;
    };
    hasta: {
      pais: string;
      ciudad: string;
      calle: string;
    };
    _id: string;
    usuario: {
      _id: string;
      fullname: string;
      email: string;
      __v: number;
    };
    cuando: string;
    horaSalida: string;
    horaLlegada: string;
    eresFlexible: boolean;
    estado: boolean;
    precio: {
      quantity: number;
      price: number;
    }[];
    special: boolean;
    envios: {}[];
    __v: number;
  }
];

function Page(props: any) {
  const [viajes, setViajes] = useState<Viajes | null>(null);
  const navigate = useRouter();
  const clickHandler = (viaje: any) => {
    props.close(viaje);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/auth/findatrip/?cityOrigin=${props.ciudadOrigen}&cityFinal=${props.ciudadDestino}`
        );
        const data = await response.json();

        props.open.type === "Special"
          ? setViajes(data.filter((viaje: any) => viaje.special === true))
          : props.open.size === "Pequeño"
          ? setViajes(data.filter((viaje: any) => viaje.precio[0].quantity > 0))
          : props.open.size === "Mediano"
          ? setViajes(data.filter((viaje: any) => viaje.precio[1].quantity > 0))
          : setViajes(
              data.filter((viaje: any) => viaje.precio[2].quantity > 0)
            );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="m-10">
        <button onClick={props.close}>
          <FaArrowLeft />
        </button>
      </div>
      <div className="flex flex-col p-4 items-center">
        <h1 className="text-2xl font-bold">Solicita tu envío a un viajero</h1>
        <div className="border p-5">box</div>
        <div>
          <Image src={img} width={250} height={250} alt="logo" />
        </div>
        <div className="flex flex-col items-center p-5">
          <h1 className="text-2xl">Oops! Nada por acá!</h1>
          <br />
          <p className="text-center m-2">
            No encontramos trayectos con las caracteristicas que indicaste.
          </p>
        </div>
        <button
          onClick={() => navigate.push("/loged")}
          className="flex w-full mt-20 justify-center bg-pink p-3 rounded text-white"
        >
          Volver
        </button>
      </div>
      {viajes && viajes.length > 0 && (
        <div className="flex flex-col fixed top-0 left-0 right-0 bottom-0 z-20 w-full h-full m-2 p-4 bg-white gap-y-3">
          <h1 className="text-xl">Viajeros disponibles</h1>
          {viajes?.map((viaje: any, index: any) => (
            <div
              onClick={() => clickHandler(viaje)}
              className="flex flex-col border rounded cursor-pointer shadow-lg p-4"
              key={index}
            >
              <div className="flex w-full justify-between px-4">
                <div className="flex">
                  <FaUser size={40} />
                  <p className="text-xl">{viaje.usuario.fullname}</p>
                </div>
                <p>{`${
                  props.open.type === "Special"
                    ? "Confirma con el conductor"
                    : props.open.size === "Pequeño"
                    ? `${viaje.precio[0].price}€`
                    : props.open.size === "Mediano"
                    ? `${viaje.precio[1].price}€`
                    : `${viaje.precio[2].price}€`
                }`}</p>
              </div>
              <div>
                <div className="flex">
                  <GiPathDistance
                    className={`${
                      viaje.eresFlexible ? "text-pink" : "text-black"
                    }`}
                    size={50}
                  />
                  <div>
                    <p>
                      Desde:{viaje.desde.ciudad} {viaje.horaSalida}
                    </p>
                    <p>
                      Hasta:{viaje.hasta.ciudad} {viaje.horaLlegada}
                    </p>
                  </div>
                </div>
                {viaje.cuando}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;
