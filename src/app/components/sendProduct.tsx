import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { TfiPackage } from "react-icons/tfi";
import ProdForm from "./ProdForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CheckCircle2 } from "lucide-react";

export const SendProduct = (props: any) => {
  const [specials, setSpecials] = useState<boolean>(false);
  const [hoverButton, setHoverButton] = useState(false);
  const specialsHandler = () => {
    setSpecials(!specials);
  };
  const formSchema = z.object({
    pequeño: z.object({
      quantity: z.coerce.number(),
      price: z.coerce.number(),
    }),
    mediano: z.object({
      quantity: z.coerce.number(),
      price: z.coerce.number(),
    }),
    grande: z.object({
      quantity: z.coerce.number(),
      price: z.coerce.number(),
    }),
    specialSize: z.object({
      quantity: z.coerce.number(),
      price: z.coerce.number(),
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pequeño: {
        quantity: 0,
        price: 0,
      },
      mediano: {
        quantity: 0,
        price: 0,
      },
      grande: {
        quantity: 0,
        price: 0,
      },
      specialSize: {
        quantity: 0,
        price: 0,
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const fixedValues = { ...values, special: specials };
    hoverButton && props.closeModal(fixedValues);
    if (
      values.pequeño.quantity ||
      values.mediano.quantity ||
      values.grande.quantity  ||
      values.specialSize.quantity
    ) {
      props.setProductSelected(true);
    } else {
      props.setProductSelected(false);
    }
  }

  return (
    <div className="flex flex-col m-6 p-4">
      <Button onClick={props.closePropModalHandler} variant={"ghost"}>
        <IoMdArrowRoundBack />
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-bold mb-4">¿Qué puedes enviar?</h1>
          <div className="flex gap-x-4">
            <div className="border-2 relative border-slate-300 rounded p-3">
              <div
                style={{ top: "-1px", left: "-10px" }}
                className="bg-pink text-white absolute text-xs font-bold p-1 px-2 justify-center rounded"
              >
                {"<5Kg"}
              </div>
              <div className="flex flex-col items-center mt-6">
                <TfiPackage className="text-slate-300" size={50} />
                <p className="text-sm font-bold mt-2">Pequeño</p>
                <p className="text-sm font-bold">64x30cm</p>
              </div>
              <FormField
                name="pequeño.quantity"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                name="pequeño.price"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio $</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>

            <div className="border-2 relative border-slate-300 rounded p-3">
              <div
                style={{ top: "-1px", left: "-10px" }}
                className="bg-pink text-white absolute text-xs font-bold p-1 px-2 justify-center rounded"
              >
                {"5-15Kg"}
              </div>
              <div className="flex flex-col items-center mt-6">
                <TfiPackage className="text-slate-300" size={50} />
                <p className="text-sm font-bold mt-2">Mediano</p>
                <p className="text-sm font-bold">81x37cm</p>
              </div>
              <FormField
                name="mediano.quantity"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                name="mediano.price"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio $</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>
            <div className="border-2 relative border-slate-300 rounded p-3">
              <div
                style={{ top: "-1px", left: "-10px" }}
                className="bg-pink text-white absolute text-xs font-bold p-1 px-2 justify-center rounded"
              >
                {"15-30Kg"}
              </div>
              <div className="flex flex-col items-center mt-6">
                <TfiPackage className="text-slate-300" size={50} />
                <p className="text-sm font-bold mt-2">Grande</p>
                <p className="text-sm font-bold">67x44cm</p>
              </div>
              <FormField
                name="grande.quantity"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cantidad</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>

              <FormField
                name="grande.price"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio $ </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
            </div>
          </div>
          <div className="w-full flex-col my-5 flex justify-around items-center rounded-xl bg-gray-50 shadow-md">
            <div className="flex flex-col  justify-center items-center w-full">
              <h3 className="font-bold">
                Además, ¿Puedes transportar artículos especiales?
              </h3>
              <p className=" mr-2 ">
                Si las condiciones de tu vehículo y trayecto lo permiten
                presiona el botón
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center">
              <div className="flex gap-x-4 justify-center items-center">
                <Button
                  onClick={specialsHandler}
                  className="bg-rose-200 text-pink mt-4 text-sm w-[70px] h-[24px] "
                  >
                  {specials ? "Cancelar" : "Aceptar"}
                </Button>
                {specials ? <CheckCircle2 className="text-green-400 mt-4" /> : null}
              </div>
              {
                 (
                  <div className="border flex flex-col m-2 p-2 justify-center">
                    <FormField
                    name="specialSize.quantity"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cantidad</FormLabel>
                        <FormControl>
                          <Input disabled={!specials} type="number" {...field} />
                        </FormControl>
                      </FormItem>
                      )}
                    ></FormField>

                    <FormField
                    name="specialSize.price"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio $ </FormLabel>
                          <FormControl>
                            <Input disabled={!specials} type="number" {...field} />
                          </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    ></FormField>
                  </div>
                )
              }
            </div>
          </div>
          <Button
            type="submit"
            onMouseEnter={() => setHoverButton(true)}
            onMouseLeave={() => setHoverButton(false)}
            variant={"ghost"}
            className="bg-pink text-white w-full p-3 m-3 rounded-xl font-bold text-lg mx-auto"
          >
            Cerrar
          </Button>
        </form>
      </Form>
    </div>
  );
};
