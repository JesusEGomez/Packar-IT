import Image from "next/image";
import React, { useState } from "react";
import LeftArrow from "../../../public/left-arrow.svg";
import { useRouter } from "next/navigation"; // Corregido el import
import InputCode from "./InputCode";
import { Button } from "@/components/ui/button";

const VerificationCode = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string>('');

  const goBackArrow = () => {
    router.back();
  };

  const verifyCode = async () => {
    console.log('Tipo de dato del código:', typeof verificationCode);
    console.log('Valor de verificationCode:', verificationCode);

    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: verificationCode, action: 'verifyCode' }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Código verificado con éxito');
        router.push('/');
      } else {
        console.error('Error al verificar el código:', data.error || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error al verificar el código:', error);
    }
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
          Por favor, introduce el código de{' '}
          <span className="block text-left">verificación que te hemos enviado.</span>
        </p>
      </div>
      <InputCode
        length={6}
        loading={loading}
        onComplete={(code) => setVerificationCode(code)}
      />

      <div className="text-dark text-center my-5">
        <p>
          ¿No has recibido el código?{' '}
          <span className="cursor-pointer text-teal-500">Reenviar código</span>
        </p>
      </div>

      <div className="my-5 flex justify-center items-center">
        <Button
          type="button"
          className="w-1/4 md:w-1/4 h-12 mt-5 bg-pink text-white rounded-lg px-4 py-3"
          onClick={verifyCode}
        >
          Verificar
        </Button>
      </div>
    </>
  );
};

export default VerificationCode