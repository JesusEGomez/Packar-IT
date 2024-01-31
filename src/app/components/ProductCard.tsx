import Link from "next/link";
import { GoArchive, GoDotFill } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IProductDB } from "../interfaces/productDB.interface";

interface IProductCardProps {
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
  estado: string;
  cuando: string;
  producto: IProductDB;

  _id: string;
}
const stateClasses = {
  Cancelado: "text-red-500",
  Pendiente: "text-yellow-500",
  "En Curso": "text-green-500",
  Finalizado: "text-blue-500",
};

const ProductCard = ({
  cuando,
  desde,
  estado,
  hasta,
  horaLlegada,
  horaSalida,
  producto,
  _id,
}: IProductCardProps) => {
  console.log(producto.name);
  return (
    <div className="w-full h-[110px] rounded-xl  shadow-md  hover:bg-gray-100 bg-white justify-around sm:justify-evenly items-center flex">
      <p className="text-5xl  w-1/5 text-pink">
        <GoArchive />
      </p>
      <div className="flex sm:flex-row sm:gap-x-4 w-3/5  flex-col">
        <div className="flex w-full justify-evenly">
          <p> {`${horaSalida} - ${horaLlegada} `}</p>
          <div className="flex items-center">
            <p className={stateClasses[estado]}>
              <GoDotFill />
            </p>
            <p>{estado}</p>
          </div>
        </div>

        <p className="truncate ">{`${desde.ciudad} / ${hasta.ciudad}`}</p>
        <h3 className="font-bold ">{producto.name}</h3>
      </div>
      <p className="text-3xl hover:text-pink cursor-pointer w-1/12 text-gray-500">
        <Link href={`misenvios/envios/${_id}`}>
          <MdKeyboardArrowRight />
        </Link>
      </p>
    </div>
  );
};

export default ProductCard;
