import React from "react";
import { FaBox } from "react-icons/fa";

const CardEnvios: React.FC = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl p-2">
      <div className="card-body">
        <h1 className="card-title">
          <FaBox className="mr-2" />
          ENVÍO
        </h1>
        <p>STATUS</p>
      </div>
    </div>
  );
};

export default CardEnvios;
