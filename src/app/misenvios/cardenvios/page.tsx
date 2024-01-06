"use client"

import React, { useEffect, useState } from "react";
import { FaBox } from "react-icons/fa";


interface Envio {
  _id: string;
  usuario: {
    _id: string;
    email: string;
    fullname: string;
  };
  desde: {
    lat: number;
    lng: number;
  };
  hasta: {
    lat: number;
    lng: number;
    coordenadasExtras: string[];
  };
  cuando: Date;
  producto: {
    name: string;
  };
}

const CardEnvios: React.FC = () => {
  const [envios, setEnvios] = useState<Envio[]>([]);

  useEffect(() => {
    // Lógica para obtener los envíos desde el backend
    const fetchEnvios = async () => {
      try {
        const response = await fetch("/api/auth/envio", {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setEnvios(data);
        } else {
          console.error("Error al obtener los envíos desde el backend");
        }
      } catch (error) {
        console.error("Error al realizar la solicitud al backend:", error);
      }
    };

    fetchEnvios();
  }, []); // Se ejecuta solo en el montaje

  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {envios.map((envio) => (
        <div key={envio._id} className="envio-container card w-full bg-base-100 shadow-xl p-2">
          <div className="card-body flex flex-col items-center justify-center text-center">
            <FaBox className="icon text-5xl mb-2" />
            <h1 className="title text-3xl font-bold mb-2">{envio.producto.name}</h1>
            <p className="status text-red-500 font-bold">PENDING</p>
          </div>
        </div>
      ))}

      {/* Botón de Navegación */}
      
    </div>
  );
};

export default CardEnvios;