'use client'

const AcceptOrReject = () => {
    
    return(
        <div className="flex flex-col gap-3 items-center justify-center p-2">
            <h1 className="text-xl">Tienes una solicitud de envío!!</h1>
            <button className="bg-pink w-full disabled:opacity-70 text-white font-bold rounded-xl p-3">Aceptar</button>
            <button className="bg-white w-full text-black border font-bold rounded-xl p-3 hover:bg-slate-400">Rechazar</button>
        </div>
    )
}

export default AcceptOrReject;