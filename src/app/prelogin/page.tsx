"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

function PreLogin() {
  return (
    <div className="page-pink flex-col md:items-center p-5  ">
      <h2 className="onboarding-font  text-3xl font-semibold">
        Aprovecha el viaje de otra persona para enviar lo que necesites.
      </h2>
      <div className="flex md:w-1/4 flex-col">
        <Link className={buttonVariants()} href={"/prelogin/register"}>
          Crear una cuenta
        </Link>
        <Link
          className={buttonVariants({
            class: "bg-white mt-2 text-black",
            variant: "ghost",
          })}
          href={"prelogin/register/login"}
        >
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
}

export default PreLogin;
