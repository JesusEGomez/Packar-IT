"use client";

import { Button } from "@/components/ui/button";
import { Loader2 , ArrowLeft} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaExclamationCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

interface FormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.ok) {
        navigate.push("/loged");
        setLoading(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Usuario y contraseña no coinciden",
          confirmButtonColor: "#fe1252",
        });
        setLoading(false);
      }
      //console.log(res, data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex bg-white items-stretch justify-center  flex-col mt-0.5 md:items-center">
      <form
        className="flex flex-col p-4 gap-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Link href={"/prelogin"}>
          <ArrowLeft className="w-7" />
        </Link>
        <h1 className="text-2xl font-bold text-defaultButton mb-3">
          Iniciar sesión
        </h1>
        <h2 className="text-xl m-4 font-bold text-center text-defaultButton mb-3">
          Encuentra tu mejor opción al mejor precio.
        </h2>
        <label htmlFor="email" className="text-defaultButton">
          Email:
        </label>
        <input
          className="p-3 rounded block mb-2 bg-slate-100 text-black"
          type="email"
          {...register("email", {
            required: { value: true, message: "Campo requerido" },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "La dirección de correo electrónico debe ser válida",
            },
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
          })}
        />

        {errors.password && (
          <span className="text-white flex gap-x-3">
            <FaExclamationCircle />
            {errors.password.message}
          </span>
        )}
        <div className="flex flex-col items-center w-full">
          {loading ? (
            <Button
              disabled
              className="w-[370px] h-[48px] mt-5 bg-pink text-white rounded-lg p-3"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button className="w-[370px] h-[48px] mt-5 bg-pink text-white rounded-lg p-3">
              Iniciar sesión
            </Button>
          )}
        </div>
      </form>
      
      <Separator orientation="horizontal" className="m-5 w-2/3 " />

      <Button
        variant={"ghost"}
        onClick={() => signIn("google")}
        data-onsuccess="onSignIn"
        className="bg-white g-signin2  p-3 m-3 w-fit rounded-full mx-auto"
      >
        <FcGoogle size={30} />
      </Button>
    </div>
  );
}


/*
 {...register("password", {
            required: { value: true, message: "Campo requerido" },
            minLength: { value: 8, message: "Mínimo 8 caracteres" },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message:
                "Debe incluir al menos una minúscula, una mayúscula y un número",
            },
          })}
          <button onClick={() => navigate.push("/recoverypass")}>
        <p className="text-blue-700 text-sm underline mx-auto">
          ¿Has olvidado tu contraseña?
        </p>
      </button>
*/