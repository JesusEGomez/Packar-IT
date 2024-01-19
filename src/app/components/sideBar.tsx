"use client";

import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../Provider";
3;
import { signOut, useSession } from "next-auth/react";
import  DriveLicense  from "../components/DriveLicence"

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Phone,
  FileCheck2,
  Fingerprint,
  Banknote,
  MessageSquareHeart,
  BellRing,
  ShieldCheck,
  Settings,
  LogOut,
  Building,
  ArrowRightToLine,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { AccordionItem } from "@/components/ui/accordion";
import { IUser } from "../interfaces/user.interface";
import useUserState from "../store/sotre";

const Sidebar = () => {
  const { data: session } = useSession();
  const { fetchUser } = useUserState((state) => state);
  const { user } = useUserState((state) => state);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);

  const closeLicenceModal = () => {
    setIsLicenseModalOpen(false);
  };

  console.log("sesion", session);

  const navigation = useRouter();

  const { isOpen, sideBarControl } = useContext(SidebarContext);

  const logOutSession = () => {
    sideBarControl();
    signOut();
    localStorage.clear();
    if (!session) {
      sideBarControl();
      navigation.push("/prelogin");
    }
  };

  useEffect(() => {
    fetchUser(session?.user?.email!);
  }, []);

  

  return (
    <div className={isOpen ? "sideBarClose" : "sideBarOpen"}>
      <Command>
        <div className="m-2 flex justify-evenly items-center">
          <Avatar className="mr-2">
            <AvatarImage src={session?.user?.image!} alt="@shadcn" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <h3>{session?.user?.name!}</h3>
          <ArrowRightToLine
            className="cursor-pointer"
            onClick={() => navigation.push("/loged/profile")}
          />
        </div>
        <CommandSeparator className="my-3" />
        <CommandList className="overflow-visible">
          <CommandGroup heading="Datos personales">
            <CommandItem>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="w-full flex">
                    <Building className="sideBarIcon" />
                    Ciudad
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* <p>
                      {user.profile.city
                        ? user.profile.city
                        : "Debes completar el perfil"}
                    </p> */}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CommandItem>
            <CommandItem>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="w-full flex">
                    <Phone className="sideBarIcon" />
                    Teléfono
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* <p>
                      {user.profile.phoneNumber
                        ? user.profile.phoneNumber
                        : "Debes completar el perfil"}
                    </p> */}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CommandItem>
            <CommandItem>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="w-full flex">
                    <Fingerprint className="sideBarIcon" />
                    Documento identificador
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>{} </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CommandItem>
            <CommandItem>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="w-full flex"
                 onClick={() => {
                  setIsLicenseModalOpen(true);
                  console.log("isLicenseModalOpen", isLicenseModalOpen); 
                }}>
                    <Fingerprint className="sideBarIcon" />
                    Licencia de Conducir
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>{} </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CommandItem>
            <CommandItem>
              <FileCheck2 className="sideBarIcon" />
              Vehículo
            </CommandItem>
          </CommandGroup>
          <CommandSeparator className="my-3" />
          <CommandGroup heading="Cuenta">
            <CommandItem>
              {" "}
              <Banknote className="sideBarIcon" />
              Monedero
            </CommandItem>
            <CommandItem>
              <MessageSquareHeart className="sideBarIcon" />
              Opiniones
            </CommandItem>
            <CommandItem>
              <BellRing className="sideBarIcon" />
              Notificaciones
            </CommandItem>
          </CommandGroup>
          <CommandSeparator className="my-3" />
          <CommandGroup>
            <CommandItem>
              <ShieldCheck className="sideBarIcon" />
              Aviso Legal y Privacidad
            </CommandItem>
            <CommandItem>
              <Settings className="sideBarIcon" />
              Ajustes
            </CommandItem>
            <CommandItem>
              <button className="flex" onClick={logOutSession}>
                <LogOut className="sideBarIcon" />
                Cerrar sesion
              </button>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      {isLicenseModalOpen && (
        <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl">
            <DriveLicense closeLicenceModal={closeLicenceModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
