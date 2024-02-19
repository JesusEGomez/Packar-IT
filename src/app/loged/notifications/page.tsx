import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GrMapLocation } from "react-icons/gr";
import { TfiPackage } from "react-icons/tfi";
import NotEnvios from "./notEnvios/page";
import NotViajes from "./notViajes/page";

const Notifications = () => {
  return (
    <div className="w-full mb-20 h-full flex flex-col justify-center items-center">
      <h2 className="p-2 font-bold text-2xl">Notificaciones</h2>
      <Tabs defaultValue="paquetes" className="w-full">
        <TabsList className="flex w-full h-[70px]  justify-around">
          <TabsTrigger
            className="w-1/2 sm:justify-center sm:gap-x-3  h-[70px]  justify-around flex"
            value="paquetes"
          >
            <p className="text-2xl text-pink">
              <TfiPackage />
            </p>
            <p className="font-semibold">Mis Envíos</p>
          </TabsTrigger>
          <TabsTrigger
            className="w-1/2 sm:justify-center sm:gap-x-3  h-[70px] flex justify-evenly"
            value="viajes"
          >
            <p className="text-2xl text-pink">
              <GrMapLocation />
            </p>
            <p className="font-semibold">Mis Viajes</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="paquetes">
          <NotEnvios />
        </TabsContent>
        <TabsContent value="viajes">
          <NotViajes />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;
