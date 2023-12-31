import { Button } from "@/components/ui/button";
import React, { useState } from "react";
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

export const SendProduct = (props: any) => {
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
  }

  return (
    <div className="flex flex-col  p-4">
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
