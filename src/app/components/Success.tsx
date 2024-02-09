import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

const Success = () => {
    const router = useRouter();
    return(
        <div className="flex flex-col gap-y-5 p-4 border justify-center items-center bg-slate-100 rounded">
            <div className="text-green-600">
                <FaCheckCircle size={70} />
            </div>
            <h1 className="text-3xl">¡Tu envió ha sido solicitado con éxito!</h1>
            <button onClick={() => router.push('/loged/misenvios')} className="bg-pink w-full text-white font-bold rounded-xl p-3">
                Cerrar
            </button>
        </div>
    )   
}

export default Success;