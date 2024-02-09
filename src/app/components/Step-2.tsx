import React from "react";
import Image from "next/image";

function Step2() {
  return (
    <div className="flex  flex-col items-center   h-[420px]   ">
      <Image
        src={"/step-2.svg"}
        height={300}
        width={350}
        alt="step-1"
        className=""
      />
      <h1 className="onboarding-font text-xl mt-28  font-bold md:text-4xl md:font-bold md:text-center md:mt-20">
        Envía tu paquete
      </h1>
      <p className="onboarding-font-text p-3">
        Elige el viaje que mejor se adapte a tus necesidades, chatea con el
        conductor que te va a llevar tu paquete. queda en el punto de recogida,
        ¡y listo!
      </p>
    </div>
  );
}

export default Step2;
