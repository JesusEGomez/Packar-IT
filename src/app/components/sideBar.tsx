"use client";
import { FaWindowClose } from "react-icons/fa";
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
  CommandInput,
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

const Sidebar = () => {
  const { data: session } = useSession();
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
              <Building className="sideBarIcon" />
              Ciudad
            </CommandItem>
            <CommandItem>
              <Phone className="sideBarIcon" />
              Teléfono
            </CommandItem>
            <CommandItem>
              <Fingerprint className="sideBarIcon" />
              Documento identificador
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
