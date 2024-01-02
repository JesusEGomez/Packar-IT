"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaExclamationCircle } from "react-icons/fa";

interface FormInputs {
  email: string;
}
function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log(data);
  };
  return (
    <div className="user-managment-styles items-center justify-center  flex-col">
      <form
        className="flex flex-col p-4 gap-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Link href={"/login"}>
          <ArrowLeft />
        </Link>
        <h2 className="text-3xl  font-bold text-defaultButton ">
          ¿Has olvidado tu contraseña?
        </h2>
        <p className="text-xl p-10 text-defaultButton ">
          ¡No te preocupes! Por favor, introduce el email asociado a tu cuenta.
        </p>
        <label htmlFor="email" className="text-default">
          Email:
        </label>
        <input
          className="p-3 rounded block mb-2 bg-slate-100 text-black"
          type="email"
          {...register("email", {
            required: { value: true, message: "Campo requerido" },
          })}
        />

        {errors.email && (
          <span className="text-white flex gap-x-3">
            <FaExclamationCircle />
            {errors.email.message}
          </span>
        )}
        <button className="w-[370px] h-[48px] mt-5 bg-pink text-white rounded-lg p-3">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Page;
