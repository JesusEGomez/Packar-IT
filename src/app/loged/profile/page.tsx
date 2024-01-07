"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa"; // Reemplaza 'react-icons/fa' con la biblioteca y el icono específico que prefieras

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

function Profile() {
  const formSchema = z.object({
    nombre: z.string(),
    email: z.string(),
    telefono: z.string(),
    ciudad: z.string(),
    driverLicense: z.object({
      frontPhoto: z.string().nullable(),
      backPhoto: z.string().nullable(),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      email: "",
      ciudad: "",
      telefono: "",
      driverLicense: {
        frontPhoto: null,
        backPhoto: null,
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="container mx-auto h-screen flex justify-center items-center">
      <h1 className="text-5xl font-bold mb-4">Mi perfil</h1>
      <div className="max-w-md p-8 bg-white rounded-md shadow-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Joe" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="correo@correo.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="5423313423" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ciudad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad</FormLabel>
                  <FormControl>
                    <Input placeholder="Madrid" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="driverLicense.frontPhoto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Licencia de Conducir (Frente)</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="driverLicense.backPhoto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Licencia de Conducir (Reverso)</FormLabel>
                </FormItem>
              )}
            />
            <Button className="bg-pink py-2 rounded-md" type="submit">
              <FaEdit className="mr-2" /> Modificar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Profile;
