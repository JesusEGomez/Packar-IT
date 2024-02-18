import { Button } from "@/components/ui/button";
import { ITravelEnvioDB } from "../interfaces/TravelDB.interface";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";

interface TravelEditModalProps {
  closeEditModal: () => void;
  travel: ITravelEnvioDB;
  updateData: () => void;
}
const TravelEditModal = ({
  closeEditModal,
  travel,
  updateData,
}: TravelEditModalProps) => {
  const [state, setState] = useState<string>();
  const [finalizado, setFinalizado] = useState<boolean>(true);
  const [enCruso, setenCruso] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const statusFinder = () => {
    //console.log(travel);
    let newProductsArray = travel.envios.filter((envio) => {
      return envio.productos.EnvioInfo.estado !== "Cancelado";
    });
    //console.log(newProductsArray);
    const travelFiltered = { ...travel, envios: newProductsArray };
    //console.log(travelFiltered);
    travelFiltered.envios.forEach((envio) => {
      if (envio.productos.EnvioInfo.estado !== "Finalizado") {
        setFinalizado(false);
      }
      if (envio.productos.EnvioInfo.estado !== "Aceptado") {
        setenCruso(false);
      }
    });
  };

  const totalEarned = () => {
    let total = 0;
    const price = {
      Pequeño: travel.precio[0],
      Mediano: travel.precio[1],
      Grande: travel.precio[2],
      Especial: travel.precio[3],
    };
    travel.envios.forEach((e) => {
      const size = e.productos.size as keyof typeof price;
      total += price[size].price!;
    });
    console.log(total);
    setTotal(total);
  };

  const changeState = async () => {
    setLoading(true);
    try {
      //console.log({ _id: travel._id, estado: state });
      if (state) {
        const response = await fetch(`/api/auth/getTravelById`, {
          method: "PATCH",
          body: JSON.stringify({ _id: travel._id, estado: state }),
        });

        if (response.ok) {
          setLoading(false);
          updateData();
          //aqui pago al conductor

          state === "Finalizado" &&
            Swal.fire({
              icon: "success",
              title: "Felicidades",
              text: `Generaste ${total}€ en este viaje `,
              confirmButtonText: "Aceptar",
            }).then((response) => {
              if (response.isConfirmed) closeEditModal();
            });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Ocurrió un error al modificar el envio",
          confirmButtonColor: "#fe1252",
          confirmButtonText: "Aceptar",
        });
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    //console.log(travel);
    statusFinder();
    totalEarned();
  }, []);

  const stateHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //console.log(event.target.value);
    setState(event.target.value);
  };
  return (
    <div className="flex flex-col   sm:text-center gap-y-5 p-4 border w-80 sm:w-96 items-center bg-slate-100 rounded">
      <div className="w-full flex justify-start">
        <Button onClick={closeEditModal} variant={"ghost"}>
          <IoMdArrowRoundBack />
        </Button>
      </div>
      <p>
        Aquí podrás gestionar el estado de tu viaje. Cada cambio que hagas se le
        avisara a las personas que enviaron paquetes en este viaje
      </p>

      <label htmlFor="estado" className="text-xl font-semibold">
        Modificar el Estado de Viaje
      </label>
      <select onChange={stateHandler} name="estado" id="estado">
        <option disabled selected defaultValue={travel.estado}>
          {travel.estado}
        </option>

        {travel.estado === "Pendiente" ? (
          <>
            {enCruso && <option value={"En Curso"}>En Curso</option>}
            <option value={"Cancelado"}>Cancelado</option>
          </>
        ) : null}

        {travel.estado === "En Curso" && finalizado ? (
          <option value={"Finalizado"}>Finalizado</option>
        ) : null}
      </select>
      {loading ? (
        <Button disabled className=" bg-pink text-white rounded-lg ">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button
          className="bg-pink text-white rounded-lg"
          disabled={travel.estado === "Cancelado"}
          onClick={changeState}
        >
          Modificar
        </Button>
      )}
      {!enCruso && travel.estado === "Aceptado" && (
        <p>
          Para cambiar al estado <b>En Curso</b> todos tus viajes deben estar
          aceptados o cancelados.
        </p>
      )}
    </div>
  );
};

export default TravelEditModal;
