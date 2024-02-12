"use client";

import { useState, ChangeEvent, useCallback, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
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
  const [disable, setDisble] = useState<boolean>(true);

  const submitHandler = () => {
    const newRecipient = {
      nombreApellidos: nombreApellidos,
      telefono: telefono,
      email: email,
    };
    props.closeModal(newRecipient);
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
    <div className="flex items-center justify-center h-screen md:justify-start md:items-center">
      <div className="p-8  top-0 md:z-10 md:justify-center md:items-center md:bg-white">
        <div className="mb-8 cursor-pointer" onClick={props.closeModal}>
          <FaArrowLeft className="absolute left-4 " />
        </div>
        <h1 className="text-3xl font-bold text-center mb-8">
          ¿A quién se lo envías?
        </h1>
        <p className="text-gray-700 mb-8">
          Indique los datos de la persona a la que va a recoger el paquete
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {" "}
          <div className="mb-4">
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
          </div>
          <div className="mb-4">
            <label
              htmlFor="telefono"
              className="block text-gray-700 font-bold mb-2"
            >
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              value={telefono}
              onChange={handleTelefonoChange}
              placeholder="Teléfono"
              pattern="\d{10}"
              maxLength={10}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <div className="mb-4">
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
