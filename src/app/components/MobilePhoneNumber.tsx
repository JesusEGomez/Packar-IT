import Image from "next/image";
import React, { useState } from "react";
import MobilePhoneNumberSvg from "../../../public/mobile-phone-number-svg.svg";
import SelectPhoneNumber from "./SelectPhoneNumber";
import { useRouter } from "next/navigation";
import CountryCode from "./CountryCode";

const MobilePhoneNumber: React.FC<any> = () => {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<any>("");
  console.log("Número de teléfono:", phoneNumber);
  const sendVerificationCode = async () => {
    try {
      if (!countryCode.trim() || !phoneNumber.trim()) {
        console.error("Por favor, ingresa un número de teléfono válido.");
        return;
      }
      const fullPhoneNumber = `+${countryCode}${phoneNumber}`;

      const response = await fetch('/api/auth/sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: fullPhoneNumber }),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log("Mensaje enviado con éxito");
        router.push("/verification-code");
      } else {
        console.error("Error al enviar el mensaje:", data.error || "Error desconocido");
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
    };

  return (
    <div className="content w-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <Image
          style={{ width: "50%", height: "50%" }}
          className="my-5"
          src={MobilePhoneNumberSvg}
          alt="Checked"
        />
        <p className="fw-bold fs-5 mt-5 mb-3">
          Introduce tu número de teléfono
        </p>
        <div className='flex flex-col w-full lg:w-full mx-auto lg:flex-row justify-center items-center'>
          <CountryCode onCountryCodeChange={(value: string) => setCountryCode(value)} />
          <input
            placeholder='Número de teléfono'
            type="number"
            className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 w-1/2 lg:w-full"
            id="number"
            aria-describedby="phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <p className="fs-6 mt-4 mb-3">
          Te enviaremos un código OTP para{" "}
          <span className="d-block text-left">
            verificar tu número de teléfono
          </span>
        </p>
        <div className="container mb-4">
          <div className="col-12">
            <button
              type="button"
              className="btn w-50 mx-auto p-3 text-light mt-3"
              style={{ background: "var(--primary-color)" }}
              onClick={sendVerificationCode}
            >
              Enviar código
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePhoneNumber;
