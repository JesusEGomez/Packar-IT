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
import { GrBike } from "react-icons/gr";
import { MdSurfing } from "react-icons/md";
import { LuSofa, LuBedDouble } from "react-icons/lu";
import { PiTelevisionBold } from "react-icons/pi";
import { TbKayak } from "react-icons/tb";
import { GiSkier } from "react-icons/gi";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export const SendProduct = (props: any) => {
  const specials:string[] = [];
  const specialHandler = (item:string) => {
    if(!specials.includes(item)) specials.push(item);
  }
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
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    props.closeModal(values);
    if (
      values.pequeño.quantity ||
      values.mediano.quantity ||
      values.grande.quantity
    ) {
      props.setProductSelected(true);
    } else {
      props.setProductSelected(false);
    }
  }


  return (
    <div className="flex flex-col  p-4">
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
          <div className="flex flex-col gap-y-4 my-4">
            <h1 className="text-xl font-bold">Además, ¿Puedes transportar artículos especiales?</h1>
            <p>Si las condiciones de tu vehículo y trayecto lo permiten, selecciona aquellos artículos que podrías transportar.</p>
            <div className="flex flex-wrap gap-8 justify-center items-center">
              <div className="flex flex-col gap-y-2 justify-center items-center">
                <div 
                className='p-5 rounded-full text-black bg-slate-300'
                onClick={() => specialHandler('Bicicleta')}>
                  <GrBike size={30} />
                </div>
                <p className="text-sm">Bicicleta</p>
              </div>
              <div className="flex flex-col gap-y-2 justify-center items-center" onClick={() => specialHandler('Tabla de surf')}>
                <div className='p-5 rounded-full text-black bg-slate-300' >
                  <MdSurfing size={30} />
                </div>
                <p className="text-sm">Tabla de surf</p>
              </div>
              <div className="flex flex-col gap-y-2 justify-center items-center" onClick={() => specialHandler('Silla')}>
                <div className='p-5 rounded-full text-black bg-slate-300'>
                  <LuSofa size={30} />
                </div>
                <p className="text-sm">Silla</p>
              </div>
              <div className="flex flex-col gap-y-2 justify-center items-center" onClick={() => specialHandler('Cama')}>
                <div className='p-5 rounded-full text-black bg-slate-300'>
                  <LuBedDouble size={30} />
                </div>
                <p className="text-sm">Cama</p>
              </div>
              <div className="flex flex-col gap-y-2 justify-center items-center" onClick={() => specialHandler('TV')}>
                <div className='p-5 rounded-full text-black bg-slate-300'>
                  <PiTelevisionBold size={30} />
                </div>
                <p className="text-sm">TV</p>
              </div>
              <div className="flex flex-col gap-y-2 justify-center items-center" onClick={() => specialHandler('Kayak')}>
                <div className='p-5 rounded-full text-black bg-slate-300'>
                  <TbKayak size={30} />
                </div>
                <p className="text-sm">Kayak</p>
              </div>
              <div className="flex flex-col gap-y-2 justify-center items-center" onClick={() => specialHandler('Esquis')}>
                <div className='p-5 rounded-full text-black bg-slate-300'>
                  <GiSkier size={30} />
                </div>
                <p className="text-sm">Esquíes</p>
              </div>
              <div className="flex flex-col gap-y-2 justify-center items-center" onClick={() => specialHandler('Otro')}>
                <div className='p-5 rounded-full text-black bg-slate-300'>
                  <AiOutlineQuestionCircle size={30} />
                </div>
                <p className="text-sm">Other</p>
              </div>
            </div>
          </div>
          <Button
            type="submit"
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
