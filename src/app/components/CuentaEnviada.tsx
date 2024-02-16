import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

const CuentaEnviada = (props:any) => {
    const router = useRouter();
    return(
        <div className="flex flex-col gap-y-5 p-4 border justify-center items-center bg-slate-100 rounded">
            <div className="text-green-600">
                <FaCheckCircle size={70} />
            </div>
            <h1 className="text-3xl">¡Tu cuenta ha sido enviada con éxito!</h1>
            <p>Te enviaremos un correo apenas sea aprobada por soporte.</p>
            <button onClick={props.close} className="bg-pink w-full text-white font-bold rounded-xl p-3">
                Cerrar
            </button>
        </div>
    )   
}

export default CuentaEnviada;