import React from "react";
import CardEnvios from "./cardenvios/psge";
import { useRouter } from "next/navigation";

const MisEnvios: React.FC = () => {
  // const navigate = useRouter();

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center text-center">
        <div className="flex flex-row">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl m-1">
            Mis Envíos
          </h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl m-1">
            Mis Trayectos
          </h2>
        </div>
      </div>
      <CardEnvios />
    </div>
  );
};

export default MisEnvios;
