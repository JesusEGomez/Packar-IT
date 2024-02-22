"use client";

import { Button } from "@/components/ui/button";
import { useState, ChangeEvent, useCallback, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
interface RecipientData {
  nombreApellidos: string;
  telefono: string;
  email: string;
}

const RecipientForm = (props: any): JSX.Element => {
  const [nombreApellidos, setNombreApellidos] = useState<string | undefined>(
    undefined
  );
  const [telefono, setTelefono] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [nombreApellidosError, setNombreApellidosError] = useState<
    string | null
  >(null);
  const [telefonoError, setTelefonoError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [disable, setDisble] = useState<boolean>(true);

  const validateForm = () => {
    let isValid = true;

    // Verificar que los campos no estén vacíos
    if (!nombreApellidos) {
      setNombreApellidosError("El nombre y apellidos son obligatorios.");
      isValid = false;
    } else {
      setNombreApellidosError(null);
    }

    if (!telefono) {
      setTelefonoError("El teléfono es obligatorio.");
      isValid = false;
    } else if (telefono.length <= 10) {
      setTelefonoError("El teléfono debe tener mas de 10 dígitos.");
      isValid = false;
    } else {
      setTelefonoError(null);
    }

    // Validar el formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("El correo electrónico es obligatorio.");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("El correo electrónico no tiene un formato válido.");
      isValid = false;
    } else {
      setEmailError(null);
    }

    return isValid;
  };

  const submitHandler = () => {
    if (validateForm()) {
      const newRecipient = {
        nombreApellidos: nombreApellidos,
        telefono: telefono,
        email: email,
      };
      props.closeModal(newRecipient);
    } else {
      // Mostrar un mensaje de error o realizar alguna acción
      console.error("Los datos ingresados no son válidos.");
    }
  };

  const handleNombreApellidosChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setNombreApellidos(e.target.value);
    },
    []
  );

  const handleTelefonoChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setTelefono(e.target.value);
    },
    []
  );

  const handleEmailChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setEmail(e.target.value);
    },
    []
  );

  useEffect(() => {
    nombreApellidos && telefono && email && setDisble(false);
  }, [nombreApellidos, telefono, email]);

  return (
    <div className="flex items-center justify-center mb-6 h-screen md:justify-start md:items-center">
      <div className="p-8 pt-16 top-0">
          <Button onClick={props.closeModal} variant={"ghost"}>
            <IoMdArrowBack />
          </Button>
        <h1 className="text-3xl font-bold text-center mb-8">
          ¿A quién se lo envías?
        </h1>
        <p className="text-gray-700 mb-8">
          Indique los datos de la persona a la que va a recoger el paquete
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {" "}
          <div className="mb-4 relative">
            <label
              htmlFor="nombreApellidos"
              className="block text-gray-700 font-bold mb-2"
            >
              Nombre y apellidos
            </label>
            <input
              type="text"
              id="nombreApellidos"
              value={nombreApellidos}
              onChange={handleNombreApellidosChange}
              placeholder="Nombre y apellidos"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
            />
            {nombreApellidosError && (
              <span className="text-red-500 text-xs">
                {nombreApellidosError}
              </span>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="telefono"
              className="block text-gray-700 font-bold mb-2"
            >
              Teléfono
            </label>
            <input
              type="tel"
              pattern="[0-9]*"
              inputMode="numeric"
              id="telefono"
              value={telefono}
              onChange={handleTelefonoChange}
              placeholder="Teléfono"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
            />
            {telefonoError && (
              <span className="text-red-500 text-xs">{telefonoError}</span>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
            />
            {emailError && (
              <span className="text-red-500 text-xs">{emailError}</span>
            )}
          </div>
        </div>
        <div className="bg-pink p-2 rounded-md mt-4">
          <button
            disabled={disable}
            onClick={submitHandler}
            className="text-white w-full text-center px-4 py-2 font-bold hover:bg-#CD3B85 disabled:opacity-55"
          >
            <h3 className="text-white">Siguiente</h3>{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipientForm;
