import Link from "next/link";
import { GoArchive, GoDotFill } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IProductDB } from "../interfaces/productDB.interface";
import { toDate } from "date-fns";

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
  Cancelado: "text-red-500 text-2xl",
  Aceptado: "text-yellow-500 text-2xl",
  "En Curso": "text-green-500 text-2xl",
  Entregado: "text-blue-500 text-2xl ",
  Finalizado: "text-blue-500 text-2xl  ",
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
  console.log();
  return (
    <div className="w-full  h-[90px] rounded-xl  shadow-md  hover:bg-gray-100 bg-white justify-around sm:justify-evenly items-center flex sm:pl-48 pr-24">
      <p className="text-5xl w-1/5 text-pink">
        <GoArchive />
      </p>
      <div className="flex sm:flex-row sm:gap-x-2 w-3/5   flex-col">
        <div className="flex w-full flex-col sm:flex-row  ">
          <div className="flex w-full   justify-evenly  sm:flex-row">
            <p className=""> {`${horaSalida} - ${horaLlegada} `}</p>
            <p className="">
              {" "}
              {toDate(cuando).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
          <p className="truncate sm:w-2/3 ">{`${desde.ciudad?.replaceAll(
            "-",
            " "
          )} / ${hasta.ciudad?.replaceAll("-", " ")}`}</p>
          <h3 className="font-bold ">{producto.name}</h3>
        </div>

        <div className="flex items-center">
          <p className={stateClasses[estado as keyof typeof stateClasses]}>
            <GoDotFill />
          </p>
          <p>{estado}</p>
        </div>
      </div>
      <p className="text-3xl hover:text-pink  cursor-pointer w-1/12 text-gray-500">
        <Link href={`misenvios/envios/${_id}`}>
          <MdKeyboardArrowRight />
        </Link>
      </p>
    </div>
  );
};

export default ProductCard;
