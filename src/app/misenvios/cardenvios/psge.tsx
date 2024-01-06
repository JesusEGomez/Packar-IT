import React from "react";
import { FaBox } from "react-icons/fa";

const CardEnvios: React.FC = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl p-2">
      <div className="card-body flex ">
        <div>
          <FaBox className="mr-2" />
        </div>
        <div className="flex flex-col">
          <h1 className="card-title">ENVÍO</h1>
          <p>STATUS</p>
        </div>
      </div>
    </div>
  );
};

export default CardEnvios;
