"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaExclamationCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface FormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) alert(res.error);
      navigate.push("/loged");
      console.log(res, data);
    } catch (error) {
      console.log(error);
    }
  };
  const googleBtn = async () => {
    const res = await signIn("google", {
      redirect: false,
    });
    navigate.push("/loged");
  };

  return (
    <div className="user-managment-styles items-center justify-center  flex-col">
      <form
        className="flex flex-col p-4 gap-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Link href={"/preLogin"}>
          <ArrowLeft className="w-7" />
        </Link>
        <h1 className="text-2xl font-bold text-defaultButton mb-3">
          Iniciar sesión
        </h1>
        <h2 className="text-xl m-4 font-bold text-center text-defaultButton mb-3">
          Encuentra tu mejor opcion al mejor precio.
        </h2>
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
        <button className="w-[370px] h-[48px] mt-5 bg-pink text-white rounded-lg p-3">
          Iniciar sesión
        </button>
      </form>
      <button onClick={() => navigate.push("/recoverypass")}>
        <p className="text-blue-700 text-sm underline mx-auto">
          ¿Has olvidado tu contraseña?
        </p>
      </button>
      <Separator orientation="horizontal" className="m-5 w-2/3 " />

      <Button
        variant={"ghost"}
        onClick={() => googleBtn()}
        className="bg-white p-3 m-3 w-fit rounded-full mx-auto"
      >
        <FcGoogle size={30} />
      </Button>
    </div>
  );
}
