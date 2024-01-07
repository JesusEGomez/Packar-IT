import { Button } from "@/components/ui/button";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaExclamationCircle } from "react-icons/fa";
import { TbTriangleSquareCircle } from "react-icons/tb";

import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputs {
  salida: string;
  llegada: string;
}

function TimeForm(props: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);

    props.closeModal(data);
  };
  const close = () => {
    props.closeModal();
  };
  return (
    <div>
      <Button onClick={() => close()} variant={"ghost"}>
        <IoMdArrowRoundBack />
      </Button>
      <div className="flex w-64">
        <h1 className="text-xl font-bold mb-4">Hora de Envio</h1>
        <FaExclamationCircle className="text-slate-400" />
      </div>

      <form
        className="flex flex-col items-center p-2 mb-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col border-b m-auto w-full">
          <div className="  w-full">
            <Label htmlFor="salida">Salida:</Label>
            <Input id="salida" type="time" {...register("salida")} />
          </div>
          <div className=" w-full">
            <Label htmlFor="llegada">Llegada:</Label>
            <Input id="llegada" type="time" {...register("llegada")} />
          </div>
        </div>

        <Button
          variant={"ghost"}
          className="bg-pink text-white w-full p-3 m-3 rounded-xl font-bold text-lg mx-auto"
        >
          Aceptar
        </Button>
      </form>
    </div>
  );
}

export default TimeForm;
