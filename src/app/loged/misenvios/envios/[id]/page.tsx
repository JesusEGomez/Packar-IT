"use client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { IUserProductFull } from "@/app/interfaces/userProduct.interface";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MailIcon, Phone, User } from "lucide-react";

const Page = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<IUserProductFull>();

  const navigate = useRouter();
  const fetProductById = async (id: string) => {
    try {
      const response = await fetch(`/api/auth/ProductById/?id=${id}`);
      const newProduct = await response.json();
      console.log(newProduct);
      setProduct(newProduct);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetProductById(params.id);
    console.log(product);
  }, [params.id]);
  return (
    <div className="w-screen flex flex-col justify-center items-center">
      {product ? (
        <div className="flex w-screen  h-screen flex-col p-4">
          <Button className="w-14" onClick={navigate.back} variant={"ghost"}>
            <IoMdArrowRoundBack />
          </Button>

          <div className="h-1/3 flex p-2 items-center flex-col rounded-xl bg-gray-50 gap-y-2  shadow-md  ">
            <h3 className="text-xl font-semibold">Datos del Conductor</h3>
            <div className="flex gap-4 flex-col">
              <div className="flex gap-x-2 text-lg ">
                <User /> <p>{` Nombre: ${product.driverUser.fullname}`}</p>{" "}
              </div>
              <div className="flex  gap-x-2 text-lg">
                <Phone />{" "}
                <p>{`Telefono: ${product.driverProfile.phoneNumber}`}</p>
              </div>
              <div className="flex gap-x-2 text-lg ">
                <MailIcon /> <p>{`Mail: ${product.driverUser.email}`}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
};

export default Page;
