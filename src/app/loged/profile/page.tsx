"use client"


import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect } from "react";

interface ProfileData {
  nombre: string;
  email: string;
  telefono: string;
  ciudad: string;
  driverLicense: {
    frontPhoto: string | null;
    backPhoto: string | null;
  };
}

function Profile() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
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
    defaultValues: profileData ?? {},
  });

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const response = await fetch(
          `/api/auth/getProfileById/?id=65a6a4cf72c947b5cbb67646`
        );
        const data = await response.json();
        console.log(data);
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }
    fetchProfileData();
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="container mx-auto h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-4">Mi perfil</h1>
      <div className="max-w-md p-8 bg-white rounded-md shadow-md">
        {profileData && (
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <div>
              <label>Nombre:</label>
              <span>{profileData.nombre}</span>
            </div>
            <div>
              <label>Email:</label>
              <span>{profileData.email}</span>
            </div>
            <div>
              <label>Teléfono:</label>
              <span>{profileData.telefono}</span>
            </div>
            <div>
              <label>Ciudad:</label>
              <span>{profileData.ciudad}</span>
            </div>
            {/* Si profileData.driverLicense es un objeto */}
            {profileData.driverLicense && (
              <>
                <div>
                  <label>Foto delantera de la licencia de conducir:</label>
                  <span>{profileData.driverLicense.frontPhoto}</span>
                </div>
                <div>
                  <label>Foto trasera de la licencia de conducir:</label>
                  <span>{profileData.driverLicense.backPhoto}</span>
                </div>
              </>
            )}
            <Button className="bg-pink py-2 rounded-md" type="submit">
              <FaEdit className="mr-2" /> Modificar
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
