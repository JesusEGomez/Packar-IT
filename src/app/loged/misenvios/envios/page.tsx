"use client";

import ProductCard from "@/app/components/ProductCard";
import React, { useEffect, useState } from "react";

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

const Envios: React.FC = () => {
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
    <div className="w-full flex justify-center items-center md:w-32 lg:w-48">
      {/* <ProductCard /> */}
    </div>
  );
};

export default Envios;
