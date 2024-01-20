import React from "react";
import CardEnvios from "./envios/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Envios from "./envios/page";
import Viajes from "./viajes/page";
import { GoArchive } from "react-icons/go";
import { FiMapPin } from "react-icons/fi";

export default function page() {
  return (
    <div className="w-full mb-20 h-full flex justify-center items-center">
      <Tabs defaultValue="paquetes" className="w-full">
        <TabsList className="flex w-full h-[70px]  justify-around">
          <TabsTrigger
            className="w-1/2 sm:justify-center sm:gap-x-3  h-[70px]  justify-around flex"
            value="paquetes"
          >
            <p className="text-2xl text-pink">
              <GoArchive />
            </p>
            <p className="font-semibold">Mis Paquetes</p>
          </TabsTrigger>
          <TabsTrigger
            className="w-1/2 sm:justify-center sm:gap-x-3  h-[70px] flex justify-evenly"
            value="viajes"
          >
            <p className="text-2xl text-pink">
              <FiMapPin />
            </p>
            <p className="font-semibold">Mis Viajes</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="paquetes">
          <Envios />
        </TabsContent>
        <TabsContent value="viajes">
          <Viajes />
        </TabsContent>
      </Tabs>
    </div>
  );
}
