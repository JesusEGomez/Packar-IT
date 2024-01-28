import Image from "next/image";
import React, { useEffect, useState } from "react";
import MobilePhoneNumberSvg from "../../../public/mobile-phone-number-svg.svg";
import { useRouter } from "next/navigation"; 
import CountryCode from "./CountryCode";
import { Button } from "@/components/ui/button";
import { useSession } from 'next-auth/react';

const MobilePhoneNumber = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [countryCode, setCountryCode] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>(''); 

  useEffect(() => {
    if (session?.user) {
      const { name, email } = session.user;
      console.log('Información del usuario en MobilePhone:', { name, email });
    } else {
      console.error('No se encontró información del usuario en la sesión.');
    }
  }, [session]); 
  
  const sendVerificationCode = async () => {
    try {
      if (!countryCode.trim() || !phoneNumber.trim()) {
        console.error('Por favor, ingresa un número de teléfono válido.');
        return;
      }
      
      const email = session?.user?.email;

      if (!email) {
        console.error('No se encontró el email del usuario en la sesión.');
        return;
      }

      const fullPhoneNumber = `+${countryCode}${phoneNumber}`;

      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, phoneNumber: fullPhoneNumber, action: "sendCode" }),  
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Mensaje enviado con éxito');
        setVerificationCode(data.verificationCode); 
        router.push('/verification-code');
      } else {
        console.error('Error al enviar el mensaje:', data.error || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    }
  };
  
  return (
    <div className="content flex flex-col justify-center items-center py-6 px-6">
       <div className="text-center">
       <div className="flex justify-center items-center">
        <Image
          style={{ width: '40%', height: '40%' }}
          className="my-5"
          src={MobilePhoneNumberSvg}
          alt="Checked"
        />
        </div>
        <p className="fw-bold fs-5 mt-5 mb-3">Introduce tu número de teléfono</p>
        <div className="flex flex-col w-2/3 lg:w-2/3 mx-auto lg:flex-row justify-center items-center">
          <CountryCode onCountryCodeChange={(value: string) => setCountryCode(value)} />
          <input
            placeholder="Número de teléfono"
            type="number"
            className="border  mb-4 border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 w-1/2 lg:w-full"
            id="number"
            aria-describedby="phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <p className="fs-6 mt-4 mb-3">
          Te enviaremos un código OTP para{' '}
          <span className="d-block text-left">verificar tu número de teléfono</span>
        </p>
        <div className="container mb-4">
          <div className="col-12">
            <Button
              type="button"
              className="btn w-50 mx-auto p-3 text-light mt-3 bg-pink text-white"
              onClick={sendVerificationCode}
            >
              Enviar código
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePhoneNumber;
