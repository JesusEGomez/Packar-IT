import { useRouter } from "next/navigation";
import { MdErrorOutline } from "react-icons/md";

const ErrorCuenta = (props:any) => {
    const router = useRouter();
    return(
        <div className="flex flex-col gap-y-5 p-4 border justify-center items-center bg-slate-100 rounded">
            <div className="text-red-600">
                <MdErrorOutline size={70} />
            </div>
            <h1 className="text-3xl">¡Se ha producido un error!</h1>
            <p>Vuelve a intentarlo, si el error persiste comunicate con soport.</p>
            <button onClick={props.close} className="bg-pink w-full text-white font-bold rounded-xl p-3">
                Cerrar
            </button>
        </div>
    )   
}

export default ErrorCuenta;