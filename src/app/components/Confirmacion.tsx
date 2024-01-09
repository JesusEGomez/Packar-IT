import React, { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { PiBracketsSquareDuotone } from "react-icons/pi";
import { FaWeightHanging } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useUserState from "../store/sotre";

function Confirmacion(props: any) {
  const { envio, driver } = props;
  const navigate = useRouter();
  const { data: session } = useSession();
  console.log(envio);
  const solicitarHandler = async () => {
    try {
      const user = await fetch(
        `/api/auth/myid/?email=${session?.user?.email}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const userAns = await user.json();

      const response = await fetch("/api/auth/envio", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          userId: "659864c3d983cd9649e166a8",
          desde: envio.desde,
          hasta: envio.hasta,
          cuando: envio.cuando,
          producto: envio.producto,
          recibe: envio.recibe,
        }),
      });
      const data = await response.json();

      const update = await fetch("/api/auth/envio", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          viajeId: driver._id,
          envio,
        }),
      });
      const updated = await update.json();
      console.log(updated, "success");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(session?.user?.email);
    // fetchUser(session?.user?.email!);
  }, []);
  return (
    <div className="flex flex-col p-4">
      <div className="m-2" onClick={props.closeModal}>
        <FaArrowLeft size={30} />
      </div>
      <h1 className="text-3xl">Tu solicitud de envío</h1>
      <div>
        <div>
          <h1 className="text-5xp">{envio.producto.name}</h1>
          <p>Paquete {envio.producto.size.toLowerCase()}</p>
        </div>
        <div>
          {envio.producto.size == "Pequeño"
            ? `${driver.precio[0].price}€`
            : envio.producto.size == "Mediano"
            ? `${driver.precio[1].price}€`
            : `${driver.precio[2].price}€`}
        </div>
        <div className="border m-2 p-3">
          <div>
            <p>{driver.desde.ciudad}</p>
            <p>{driver.horaSalida}</p>
          </div>
          <div>
            <p>{driver.hasta.ciudad}</p>
            <p>{driver.horaLlegada}</p>
          </div>
          <div>
            <div>
              <PiBracketsSquareDuotone />
              <p>
                {envio.producto.size == "Pequeño"
                  ? "64x30cm"
                  : envio.producto.size == "Mediano"
                  ? "91x37cm"
                  : "67x44cm"}
              </p>
            </div>
            <div>
              <FaWeightHanging />
              <p>{envio.producto.weight}</p>
            </div>
            <div>
              <FaRegCalendarAlt />
              <p>{driver.cuando}</p>
            </div>
          </div>
        </div>
        <div className="border m-2 p-3">
          <h1 className="text-xl">Destinatario:</h1>
          <div>
            <FaRegUserCircle /> {envio.recibe.nombreApellidos}
          </div>
          <div>
            <MdAlternateEmail />
            {envio.recibe.email}
          </div>
          <div>
            <CiPhone />
            {envio.recibe.telefono}
          </div>
        </div>
        <div className="border-b m-2">
          <h1>Viajero</h1>
          <div>
            <FaRegUserCircle />
            <p>{driver.usuario.fullname}</p>
          </div>
        </div>
        <div>
          <button
            className="bg-pink w-full disabled:opacity-70 text-white font-bold rounded-b-xl p-3"
            onClick={solicitarHandler}
          >
            Solicitar envio
          </button>
          <button
            className="bg-white w-full disabled:opacity-70 text-black font-bold rounded-b-xl p-3"
            onClick={() => navigate.refresh()}
          >
            Cancelar envio
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmacion;
