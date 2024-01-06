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
        <h2 className="mb-5 text-2xl text-center">Modificar Perfil</h2>
      <div className="max-w-md">
        <div className="flex md:flex-col">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex '>
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem className="text-center">
                    <FormLabel>Nombre</FormLabel>
                    <FormControl className="w-full">
                      <Input placeholder="Joe" {...field} />
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
                      <Input placeholder="ejemplo@ejemplo.com" {...field} />
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
                      <Input placeholder="5423313423" {...field} />
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
                      <Input placeholder="Madrid" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-4 bg-pink mt-3" type="submit">
                Modificar
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Profile;