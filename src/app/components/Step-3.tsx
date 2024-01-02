import React from "react";
import Image from "next/image";

function Step3() {
  return (
    <div className="flex  flex-col items-center   h-[420px] ">
      <Image
        src={"/step-3.svg"}
        height={300}
        width={350}
        alt="step-1"
        className=""
      />
      <h2 className="onboarding-font">Ahorra dinero en tus viajes</h2>
      <p className="onboarding-font-text p-3">
        Publica tu viaje en Packar, pon un precio por tu espacio libre y ahorra
        dinero en tu viaje.
      </p>
    </div>
  );
}

export default Step3;
