import React from "react";
import { FaBox } from "react-icons/fa";

const CardEnvios: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {/* Primer Contenedor */}
      <div className="envio-container card w-full bg-base-100 shadow-xl p-2">
        <div className="card-body flex flex-col items-center justify-center text-center">
          <FaBox className="icon text-5xl mb-2" />
          <h1 className="title text-3xl font-bold mb-2">ENVÍO</h1>
          <p className="status text-red-500 font-bold">PENDING</p>
        </div>
      </div>
      
      {/* Segundo Contenedor */}
      <div className="envio-container card w-full bg-base-100 shadow-xl p-2">
        <div className="card-body flex flex-col items-center justify-center text-center">
          <FaBox className="icon text-5xl mb-2" />
          <h1 className="title text-3xl font-bold mb-2">ENVÍO</h1>
          <p className="status text-green-500 font-bold">SUCCESSFUL</p>
        </div>
      </div>
      
      {/* Tercer Contenedor */}
      <div className="envio-container card w-full bg-base-100 shadow-xl p-2">
        <div className="card-body flex flex-col items-center justify-center text-center">
          <FaBox className="icon text-5xl mb-2" />
          <h1 className="title text-3xl font-bold mb-2">ENVÍO</h1>
          <p className="status text-blue-500 font-bold">IN TRANSIT</p>
        </div>
      </div>
    </div>
  );
};

export default CardEnvios;
