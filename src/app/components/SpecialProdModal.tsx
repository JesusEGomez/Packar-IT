'use client'
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";


type FormInputs = {
    selected: string;
}

export default (props: any) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormInputs>();
      const onSubmit: SubmitHandler<FormInputs> = (data) => {
        console.log({data, name: data});
        props.closeFirstModal({data, name: data.selected});
        props.closeModal(data);
      };
      const close = () => {
        props.closeModal();
      };
    return(
        <form className="flex flex-col items-center p-2 mb-10" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Button onClick={() => close()} variant={"ghost"}>
                    <IoMdArrowRoundBack />
                </Button>
            </div>
            <h1>Selecciona tu tipo de producto</h1>
            <select
            className="p-2 rounded bg-white text-slate-400 w-full"
            id="selected"
            {...register("selected", {
              required: { value: true, message: "Campo requerido" },
            })}
            >
                <option value="" disabled selected>
                  Escoje tu producto
                </option>
                <option value="Bicicleta">Bicicleta</option>
                <option value="Tabla de surf">Tabla de surf</option>
                <option value="Silla">Silla</option>
                <option value="Cama">Cama</option>
                <option value="TV">TV</option>
                <option value="Kayak">Kayak</option>
                <option value="Esquis">Esquis</option>
                <option value="Otro">Otro</option>
          </select>
          <Button
          variant={"ghost"}
          className="bg-pink text-white w-full p-3 m-3 rounded-xl font-bold text-lg mx-auto"
          >
            Siguiente
          </Button>
        </form>
    )
};