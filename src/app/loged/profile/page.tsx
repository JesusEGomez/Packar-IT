"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

function Profile() {
  const formSchema = z.object({
    nombre: z.string(),
    email: z.string(),
    telefono: z.number(),
    ciudad: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      email: "",
      ciudad: "",
      telefono: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="max-w-md">
        <h2 className="mb-5 text-2xl">Modificar Perfil</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem className="text-center">
                  <FormLabel>Nombre</FormLabel>
                  <FormControl className="w-full">
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-center">
                  <FormLabel>Email</FormLabel>
                  <FormControl className="w-full">
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem className="text-center">
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl className="w-full">
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ciudad"
              render={({ field }) => (
                <FormItem className="text-center">
                  <FormLabel>Ciudad</FormLabel>
                  <FormControl className="w-full">
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-span-2 bg-pink mt-3" type="submit">
              Modificar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Profile;