'use client'

const ModalChangeCard = (props:any) => {
    return(
        <div className="flex flex-col p-4">
            <h1 className="text-2xl">¿Vas a cambiar de tarjeta?</h1>
            <p className="">Recuerda que esto borrará tu previa tarjeta. Esta acción es irreversible</p>
            <button className='bg-pink w-full m-2 text-white font-bold cursor-pointer rounded-xl p-3' onClick={props.closeWithChange}>Sí, cambiar</button>
            <button className='w-full border hover:bg-slate-500 cursor-pointer border-black m-2 text-black font-bold rounded-xl p-3' onClick={props.closeModal}>Cancelar</button>
        </div>
    )
}

export default ModalChangeCard;