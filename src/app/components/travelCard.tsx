import Link from "next/link";
import { GoArchive } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";

interface ITravelCardProps {
  desde: {
    pais: string | null;
    ciudad: string | null;
    calle: string | null;
  };
  hasta: {
    pais: string | null;
    ciudad: string | null;
    calle: string | null;
  };
  horaSalida: string;
  horaLlegada: string;
  estado: boolean;
  cuando: string;
  _id: string;
  eresFlexible: boolean;
}

const TravelCard = ({
  cuando,
  desde,
  estado,
  hasta,
  horaLlegada,
  horaSalida,
  _id,
  eresFlexible,
}: ITravelCardProps) => {
  const formatDesdeCiudad = desde.ciudad?.replaceAll("-", " ");
  const formatHastaCiudad = hasta.ciudad?.replaceAll("-", " ");
  console.log(_id);
  return (
    <div className="w-full h-[90px] rounded-xl  shadow-md hover:bg-gray-100 bg-white justify-around sm:justify-evenly items-center flex sm:pl-48 sm:pr-24">
      <p className="text-5xl  w-1/5 text-pink">
        <GoArchive />
      </p>
      <div className="flex sm:flex-row sm:gap-x-4 w-3/5  flex-col">
        <p className="text-gray-500">{`${horaSalida} - ${horaLlegada}`}</p>
        <h3
          title={`${formatDesdeCiudad} / ${formatHastaCiudad}` || undefined}
          className="font-bold cursor-pointer truncate "
        >{`${formatDesdeCiudad} / ${formatHastaCiudad}`}</h3>

        <p className="">{`${cuando}`}</p>
      </div>
      <p className="text-3xl hover:text-pink cursor-pointer w-1/12 text-gray-500">
        <Link href={`misenvios/viajes/${_id}`}>
          <MdKeyboardArrowRight />
        </Link>
      </p>
    </div>
  );
};

export default TravelCard;
