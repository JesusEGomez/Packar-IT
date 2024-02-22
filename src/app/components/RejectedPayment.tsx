import { useRouter } from "next/navigation";
import { MdBlockFlipped } from "react-icons/md";

const RejectedPayment = () => {
    const router = useRouter();
    return(
        <div className="flex flex-col gap-y-5 p-4 border justify-center items-center bg-slate-100 rounded">
            <div className="text-red-600">
                <MdBlockFlipped size={70} />
            </div>
            <h1 className="text-3xl">¡El envió ha sido rechazado!</h1>
            <button onClick={() => router.push('/loged/misenvios/viajes')} className="bg-pink w-full text-white font-bold rounded-xl p-3">
                Cerrar
            </button>
        </div>
    )   
}

export default RejectedPayment;