"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";
import Link from "next/link";

import { useForm, SubmitHandler } from "react-hook-form";
import { FaExclamationCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface FormInputs {
  fullname: string;
  email: string;
  password: string;
  //confirmPassword: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const fetchData = async () => {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    };
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user-managment-styles items-center justify-center  flex-col">
      <form
        className="flex flex-col p-4 gap-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Link href={"/preLogin"}>
          <ArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold text-defaultButton mb-3">
          Crear cuenta
        </h1>
        <h2 className="text-xl m-4 font-bold text-center text-defaultButton mb-3">
          Ahorra tiempo y dinero en tus envios de paqueteria.
        </h2>
        <label htmlFor="fullname" className="text-defaultButton ">
          Nombre:
        </label>

        <input
          className="p-3 rounded block mb-2 bg-slate-100 text-black"
          type="text"
          {...register("fullname", {
            required: { value: true, message: "Campo requerido" },
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
          })}
        />

        {errors.fullname && (
          <span className="text-white flex gap-x-3">
            <FaExclamationCircle /> {errors.fullname.message}
          </span>
        )}
        <label htmlFor="email" className="text-defaultButton">
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
        <label htmlFor="password" className="text-defaultButton">
          Contraseña:
        </label>

        <input
          className="p-3 rounded block mb-2 bg-slate-100 text-black"
          type="password"
          {...register("password", {
            required: { value: true, message: "Campo requerido" },
            minLength: { value: 8, message: "Mínimo 8 caracteres" },
          })}
        />

        {errors.password && (
          <span className="text-white flex gap-x-3">
            <FaExclamationCircle />
            {errors.password.message}
          </span>
        )}
        {/* <label htmlFor='confirmPassword' className='text-white'>Confirma tu contraseña:</label>
        <input className='p-3 rounded block mb-2 bg-slate-100 text-black' type="password" {...register('confirmPassword', { required: {value: true, message: 'Campo requerido'} })} />
        {
          errors.confirmPassword && <span className='text-white flex gap-x-3'><FaExclamationCircle />{errors.confirmPassword.message}</span>
        } */}

        <Button className="w-[370px] h-[48px] mt-5 bg-pink text-white rounded-lg p-3">
          Crear cuenta
        </Button>
      </form>
      <Separator orientation="horizontal" className="m-2 w-2/3  " />

      <Button
        variant={"ghost"}
        className="bg-white p-3 m-3 w-fit rounded-full mx-auto"
      >
        <FcGoogle size={30} />
      </Button>
      <p className="mx-auto mb-10 text-sm">
        ¿Ya tienes una cuenta?{" "}
        <a className="text-blue-700" href="/login">
          Inicia sesion
        </a>
      </p>
    </div>
  );
}
