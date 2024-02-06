"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowBigLeft, ArrowLeft, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { FaExclamationCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

interface FormInputs {
  fullname: string;
  email: string;
  password: string;
  //confirmPassword: string;
}
const sendEmailConfirmation = async (email: string) => {
  try {
    const response = await fetch("/api/auth/nodemailer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Error al enviar el correo electrónico de confirmación");
    }

    console.log("Correo electrónico de confirmación enviado con éxito");
  } catch (error) {
    console.error((error as Error).message);
    throw error;
  }
};

export default function Register() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setLoading(true);
    const fetchData = async () => {
      return await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    };
    try {
      const response = await fetchData();

      if (response.ok) {
        const userEmail = data.email;

        Swal.fire({
          icon: "success",
          title: "Cuenta Creada con éxito",
          confirmButtonColor: "#fe1252",
          confirmButtonText: "Iniciar sesión",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/prelogin/register/login");
            setLoading(false);

            sendEmailConfirmation(userEmail);
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Ocurrió un error",
          confirmButtonColor: "#fe1252",
          confirmButtonText: "reintentar",
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud de registro:", error);
      setLoading(false);
    }
  };

  const googleBtn = async () => {
    console.log("estoy en el pinche btn");

    const res = await signIn("google", {
      redirect: false,
    });
    router.push("/loged");
  };

  return (
    <div className="user-managment-styles items-stretch justify-center  flex-col mt-1 md:items-center ">
      <form
        className="flex flex-col p-4 gap-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Link href={"/prelogin"}>
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
          <span className="text-defaultButton flex gap-x-3">
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
          <span className="text-defaultButton flex gap-x-3">
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
          <span className="text-defaultButton flex gap-x-3">
            <FaExclamationCircle />
            {errors.password.message}
          </span>
        )}
        {/* <label htmlFor='confirmPassword' className='text-defaultButton'>Confirma tu contraseña:</label>
        <input className='p-3 rounded block mb-2 bg-slate-100 text-black' type="password" {...register('confirmPassword', { required: {value: true, message: 'Campo requerido'} })} />
        {
          errors.confirmPassword && <span className='text-defaultButton flex gap-x-3'><FaExclamationCircle />{errors.confirmPassword.message}</span>
        } */}
        <div className="flex w-full justify-center">
          {loading ? (
            <Button
              disabled
              className="w-[370px] h-[48px] mt-5 bg-pink text-white rounded-lg p-3"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button className="w-[370px] h-[48px] mt-5 bg-pink text-white rounded-lg p-3">
              Crear cuenta
            </Button>
          )}
        </div>
      </form>
      <Separator orientation="horizontal" className="m-2 w-2/3  " />

      <Button
        onClick={() => signIn("google")}
        variant={"ghost"}
        className="bg-white p-3 m-3 w-fit rounded-full mx-auto"
      >
        <FcGoogle size={30} />
      </Button>
      <p className="mx-auto mb-10 text-sm">
        ¿Ya tienes una cuenta?{" "}
        <a className="text-blue-700" href="register/login">
          Inicia sesion
        </a>
      </p>
    </div>
  );
}
