import Image from "next/image";
import React, { useEffect, useState } from "react";
import MobilePhoneNumberSvg from "../../../public/mobile-phone-number-svg.svg";
import { useRouter } from "next/navigation";
import CountryCode from "./CountryCode";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { IoMdArrowRoundBack } from "react-icons/io";

const MobilePhoneNumber = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [countryCode, setCountryCode] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(true);

  const updateButtonState = (code: string, number: string) => {
    setDisable(!code.trim() || !number.trim());
  };

  useEffect(() => {
    if (session?.user) {
      const { name, email } = session.user;
      //console.log("Información del usuario en MobilePhone:", { name, email });
    } else {
      //console.error("No se encontró información del usuario en la sesión.");
    }
  }, [session]);

  const sendVerificationCode = async () => {
    try {
      if (!countryCode.trim() || !phoneNumber.trim()) {
        //console.error("Por favor, ingresa un número de teléfono válido.");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Por favor, ingresa un número de teléfono válido.",
        });
        return;
      }

      const email = session?.user?.email;

      if (!email) {
        //console.error("No se encontró el email del usuario en la sesión.");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se encontró el email del usuario en la sesión.",
        });
        return;
      }

      const fullPhoneNumber = `+${countryCode}${phoneNumber}`;

      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          phoneNumber: fullPhoneNumber,
          action: "sendCode",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        //console.log("Mensaje enviado con éxito");
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Mensaje enviado con éxito.",
        });
        setVerificationCode(data.verificationCode);
        router.push("/verification-code");
      } else {
        console.error(
          "Error al enviar el mensaje:",
          data.error || "Error desconocido"
        );
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error al enviar el mensaje: ${
            data.error || "Error desconocido"
          }`,
        });
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  return (
    <div className="content flex flex-col justify-center items-center py- px-6">
      <div className="flex justify-start w-full">
        <Button className="w-14" onClick={router.back} variant={"ghost"}>
          <IoMdArrowRoundBack />
        </Button>
      </div>
      <div className="text-center">
        <div className="flex justify-center items-center">
          <Image
            style={{ width: "40%", height: "40%" }}
            className="my-5"
            src={MobilePhoneNumberSvg}
            alt="Checked"
          />
        </div>
        <p className="fw-bold fs-5 mt-5 mb-3">
          Introduce tu número de teléfono
        </p>
        <div className="flex flex-col w-2/3 lg:w-2/3 mx-auto lg:flex-row justify-center items-center my-auto">
          <CountryCode
            onCountryCodeChange={(value: string) => {
              setCountryCode(value);
              updateButtonState(value, phoneNumber);
            }}
          />
          <input
            placeholder="Número de teléfono"
            type="number"
            className="border   border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 w-1/2 lg:w-full"
            id="number"
            aria-describedby="phoneNumber"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              updateButtonState(countryCode, e.target.value);
            }}
          />
        </div>
        <p className="fs-6 pt-6 mb-8">
          Te enviaremos un código OTP para{" "}
          <span className="d-block text-left">
            verificar tu número de teléfono
          </span>
        </p>
        <div className="container mb-4">
          <div className="col-12">
            <Button
              type="button"
              className="bg-pink w-1/2 disabled:opacity-70 text-white font-bold rounded-b-xl p-3 "
              disabled={disable}
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
