'use client'

const AcceptOrReject = () => {
    return(
        <div>
            <h1>Tienes una solicitud de envio!!</h1>
            <button className="bg-pink w-full disabled:opacity-70 text-white font-bold rounded-xl my-2 p-3">Aceptar</button>
            <button className="bg-white w-full text-black border font-bold rounded-xl p-3">Rechazar</button>
        </div>
    )
}

export default AcceptOrReject;