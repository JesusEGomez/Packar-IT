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
import { FaEdit } from 'react-icons/fa'; // Reemplaza 'react-icons/fa' con la biblioteca y el icono específico que prefieras

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
    <div className="container mx-auto h-screen flex justify-center items-center">
      <div className="max-w-md p-8 bg-white rounded-md shadow-md">
        <h2 className="mb-5 text-2xl text-center">Modificar Perfil</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
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
            {/* Repite el bloque FormField para los otros campos */}
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
