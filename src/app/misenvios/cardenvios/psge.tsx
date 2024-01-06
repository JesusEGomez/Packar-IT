import React from "react";
import { FaBox } from "react-icons/fa";

const CardEnvios: React.FC = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl p-2">
      {/* Primer Contenedor */}
      <div className="envio-container card-body flex flex-col items-center justify-center text-center mb-4">
        <FaBox className="icon text-5xl mb-2" />
        <h1 className="title text-3xl font-bold mb-2">ENVÍO</h1>
        <p className="status text-red-500 font-bold">PENDING</p>
      </div>
      
      
      <div className="envio-container card-body flex flex-col items-center justify-center text-center mt-4">
        <FaBox className="icon text-5xl mb-2" />
        <h1 className="title text-3xl font-bold mb-2">ENVÍO</h1>
        <p className="status text-green-500 font-bold">SUCCESSFUL</p>
      </div>
    </div>
  );
};

export default CardEnvios;
