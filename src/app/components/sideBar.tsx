"use client";

import { useContext, useEffect, useState } from "react";
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
import { IUser } from "../interfaces/user.interface";

const Sidebar = () => {
  const { data: session } = useSession();
  const [localEmail, setLocalEmail] = useState();
  const [fullUser, setFullUser] = useState<IUser>({
    _id: "",
    email: "",
    fullname: "",
    profile: {
      _id: "",
      driverLicense: { backPhoto: "", frontPhoto: "" },
      idDocument: { backPhoto: "", frontPhoto: "", number: "", type: "" },
      city: "",
      phoneNumber: "",
    },
  });
  session &&
    localStorage.setItem("email", JSON.stringify(session.user?.email!));

  console.log("sesion", session);

  const navigation = useRouter();

  const { isOpen, sideBarControl } = useContext(SidebarContext);
  console.log(isOpen);
  const logOutSession = async () => {
    await signOut();
    localStorage.clear();
    if (!session) {
      sideBarControl();
      navigation.push("/prelogin");
    }
  };

  const fetchData = async () => {
    const email = session?.user?.email || localEmail;
    return await fetch(`/api/auth/signup/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  };

  useEffect(() => {
    fetchData().then((data) => {
      setFullUser(data);
    });
    const datos = localStorage.getItem("email");
    const localEmail = JSON.parse(datos!);
    setLocalEmail(localEmail);
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
                    <p>{fullUser.profile.city}</p>
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
                    <p>{fullUser.profile.phoneNumber}</p>
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
                    <p>{fullUser.profile.idDocument?.number} </p>
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
