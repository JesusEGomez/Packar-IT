'use client';

import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputs } from "../loged/page";
import { useEffect, useState } from "react";

const FormEnvio = (props: any) => {
    const [origen, setOrigen] = useState<string | null>(null)
    const [origenPais, setOrigenPais] = useState<string | null>(null)
    const [destino, setDestino] = useState<string | null>(null)
    const [destinoPais, setDestinoPais] = useState<string | null>(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormInputs>();
      const onSubmit: SubmitHandler<FormInputs> = (data) => {
        setOrigen(data.ciudadOrigen);
        setOrigenPais(data.paisOrigen);
        setDestino(data.ciudadDestino);
        setDestinoPais(data.paisDestino)
        props.closeFormModal(data)
      };

    return(
        <form className="flex  flex-col justify-center items-center gap-y-5 ">
          <input
            type="text"
            placeholder="Ciudad de origen"
            className="p-3 border-b text-slate-300"
            id="ciudadOrigen"
            {...register("ciudadOrigen")}
          />
          <input
            type="text"
            placeholder="País de origen"
            className="p-3 border-b text-slate-300"
            id="paisOrigen"
            {...register("paisOrigen")}
          />
          <input
            type="text"
            placeholder="Ciudad de Destino"
            className="p-3 border-b text-slate-300"
            id="ciudadDestino"
            {...register("ciudadDestino")}
          />
          <input
            type="text"
            placeholder="País de Destino"
            className="p-3 border-b text-slate-300"
            id="paisDestino"
            {...register("paisDestino")}
          />
          <button
              onClick={handleSubmit(onSubmit)}
              className={`bg-pink m-2 disabled:opacity-70 mx-auto text-white font-bold rounded-xl p-3`}
              >
              Siguiente
          </button>
        </form>
    )
}

export default FormEnvio;