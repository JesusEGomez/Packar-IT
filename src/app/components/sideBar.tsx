"use client";

import { useContext } from "react";
import { SidebarContext } from "../Provider";
3;
import { signOut, useSession } from "next-auth/react";

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

const Sidebar = () => {
  const { data: session } = useSession();
  console.log("data de sesion", session);
  const navigation = useRouter();

  const { isOpen, sideBarControl } = useContext(SidebarContext);
  console.log(isOpen);
  const logOutSession = () => {
    sideBarControl();
    signOut();
    if (!session) {
      navigation.push("/preLogin");
    }
  };

  // const fetchData = async () => {
  //   return await fetch("/api/auth/signup", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });
  // };
  // const response = await fetchData();

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
                    <p>Mi casita</p>
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
                    <p>012345678</p>
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
                    <p>012345678</p>
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
    </div>
  );
};

export default Sidebar;
