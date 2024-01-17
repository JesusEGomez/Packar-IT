import Image from "next/image";
import React, { useState } from "react";
import LeftArrow from "../../../public/left-arrow.svg";
import { useRouter } from "next/navigation";
import InputCode from "./InputCode";
import { Button } from "@/components/ui/button";

const VerificationCode = (props: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const goBackArrow = () => {
    router.back();
  };

  return (
    <>
      <div className="my-3 flex flex-col">
        <Image
          src={LeftArrow}
          onClick={goBackArrow}
          alt="left arrow"
          className="cursor-pointer"
        />
        <span className="m-2 text-black text-xl">Verificación</span>
      </div>
      <div className="my-5 flex items-center flex-col w-full">
        <p className="text-xl my-4">
          Por favor, introduce el código de{" "}
          <span className="block text-left">verificación que te hemos enviado.</span>
        </p>
      </div>
      <InputCode
        length={6}
        loading={loading}
        onComplete={(code) => {
          setLoading(true);
          setTimeout(() => setLoading(false), 1000);
        }}
      />

      <div className="text-dark text-center my-5">
        <p>
          ¿No has recibido el código?{" "}
          <span className="cursor-pointer text-teal-500">Reenviar código</span>
        </p>
      </div>

      <div className="my-5 flex justify-center items-center">
        <Button
          type="button"
          className="w-1/4 md:w-1/4 h-12 mt-5 bg-pink text-white rounded-lg px-4 py-3"
        >
          Verificar
        </Button>
      </div>
    </>
  );
};

export default VerificationCode;
