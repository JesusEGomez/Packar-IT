"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import CuentaEnviada from "./CuentaEnviada";
import PassportId from "./DniLicence";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Loader2 } from "lucide-react";
import ErrorCuenta from "./ErrorCuenta";

type Countryes = {
  cca2: string;
  idd: {
    root: string;
    suffixes: [string];
  };
  flag: any;
  translations: any;
}[];

type FormData = {
  countries: string;
  bank: string;
  name: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  dd: string;
  mm: string;
  aaaa: string;
  accountNumber: string;
  phonecode: string;
};

const BankAccount = (props:any) => {
    const [countries, setCountries] = useState<Countryes | null>(null);
    const localUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(localUser!);
    const [cuentaEnviada, setCuentaEnviada] = useState<boolean>(false);
    const [profile, setProfile] = useState<any>(null);
    const [idData, setIdData] = useState<any>(null);
    const [noId, setNoId] = useState<boolean>(false);
    const [isIdModalOpen, setIsIdModalOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadFetch, setLoadFetch] = useState<boolean>(true);
    const [transfers, setTransfers] = useState<number>(0);
    const [cuentaError, setCuentaError] = useState<boolean>(false);

    const clearAccount = async () => {
        const response = await fetch('/api/auth/pagoDriver',{
            headers: {
                "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify({id: profile.userId, state: 'empty'})
        })
        const updated = await response.json();
        setNoId(!noId);
    }

    const closeIdModal = () => {
        setIsIdModalOpen(false);
        setLoadFetch(!loadFetch);
      };

    const close = () => {
        setCuentaEnviada(false);
        props.closeAccount();
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormData>();

      const onSubmit: SubmitHandler<FormData> = async (data) =>{
        const accountData = {
            country: data.countries,
            bank: data.bank,
            name: data.name,
            lastName: data.lastName,
            phone: data.phonecode+data.phone,
            address: data.address,
            city: data.city,
            zipCode: data.zipCode,
            dd: data.dd,
            mm: data.mm,
            aaaa: data.aaaa,
            accountNumber: data.accountNumber,
            userId: parsedUser._id,
            email: parsedUser.email,
            idDoc:`${idData.frontPhoto}, ${idData.backPhoto}, ${idData.number}, ${idData.type}`
        }
        if(data){
            setLoading(true);
            try {
                const createAccount = await fetch('/api/auth/pagoDriver',{
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(accountData)
                })
                
                createAccount.ok || createAccount.status === 504 && setCuentaEnviada(true);
                createAccount.ok || createAccount.status === 504 && await fetch("/api/auth/newAccountMail", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(accountData),
                  });
                if(createAccount.status !== 200){
                    if(createAccount.status !== 504){
                        setCuentaError(true)
                    }
                }
                setLoading(false);
            } catch (error) {
                console.log(error);      
            }
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            //console.log(parsedUser._id);
            const response = await fetch(`/api/auth/getProfileById/?id=${parsedUser._id}`);
            const data = await response.json();
            setProfile(data);
            setIdData(data.idDocument);
        }
        
        const fetchCountries = async () => {
            const data = await fetch('https://restcountries.com/v3.1/region/europe?fields=cca2,idd,flag,name,translations');
            const info = await data.json();
            setCountries(info);
        }
        const fetchAccount = async () => {
            const data = await fetch(`/api/auth/dataAccount/?id=${parsedUser._id}`);
            const info = await data.json();
            const totalDifference = info.reduce((total: number, transfer:{amount: number, application_fee_amount: number}) => {
                const difference = transfer.amount - transfer.application_fee_amount;
                return total + difference;
            }, 0);
            setTransfers(totalDifference);
        }
        fetchProfile();
        fetchCountries();
        if(profile?.account.number){
            fetchAccount();
        }
    },[noId, loadFetch])
    return(
        <form className={`flex flex-col justify-center items-center gap-y-3 p-2 my-4 w-full `} onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-start w-full">
                <Button className="mx-3" onClick={props.closeAccount} variant={"ghost"}>
                    <IoMdArrowRoundBack />
                </Button>
            </div>
            {
             profile?.account.state === 'loaded' ?
                <div className="flex flex-col h-max p-3 gap-y-3 justify-center">
                    <h1 className="text-xl mx-2 my-4">Tu cuenta está en proceso de revision</h1>
                    <p className="text-xl mt-8 mb-4">Nuestro equipo está revisando tu cuenta te informaremos apenas esté aprovada</p> 
                </div>
                :
                profile?.account.state === 'approved' ?
                <div className="flex flex-col h-max p-3 gap-y-3 justify-center">
                    <h1 className="text-xl mx-2 my-4">Tu total acumulado para esta semana es de:</h1>
                    <p className="text-3xl mx-auto font-bold">{transfers/10} €</p>
                    <h1 className="text-xl mt-8 mb-4">Tu cuenta está aprobada</h1>
                    <p>¿Deseas cambiarla?</p>
                    <Button
                    variant={"ghost"}
                    className="bg-pink text-white w-full p-3 m-3 rounded-xl font-bold text-lg mx-auto"
                    onClick={clearAccount}
                    >
                      Eliminar cuenta
                    </Button>
                </div>
                 :  
            <div>
                <h1 className="text-xl my-4 pb-4 border-b">Ingresa los datos de tu cuenta para recibir tus pagos</h1>
                <select {...register("countries", {
                  required: { value: true, message: "Campo requerido" },
                    })} id="countries" className={`p-2 rounded bg-white w-full ${errors.bank ? "border-red-500" : ""}`}>
                    <option value="" disabled selected>Selecciona tu país</option>
                    {
                        countries && countries.map((country, i) => (<option value={country.cca2} key={i}>{`${country.translations.spa.common} (${country.cca2})`}</option>))
                    }
                </select>
                <div className="flex flex-col w-full gap-y-2">
                    <label htmlFor="">Ingresa tu banco:</label>
                    <input {...register("bank", {
                    required: { value: true, message: "Campo requerido" },
                    })} type="text" id="bank" placeholder="Banco de bilbao" className={`p-2 rounded bg-white w-full ${errors.bank ? "border-red-500" : ""}`} />
                </div>
                <div className="flex flex-col w-full gap-y-2">
                    <label htmlFor="">Ingresa tu nro de cuenta:</label>
                    <input {...register("accountNumber", {
                    required: { value: true, message: "Campo requerido" },
                    })} type="text" id="accountNumber" placeholder="12345678" className={`p-2 rounded bg-white w-full ${errors.bank ? "border-red-500" : ""}`} />
                </div>
                <div className="flex flex-col w-full gap-y-2">
                    <label htmlFor="">Ingresa tu nombre:</label>
                    <input {...register("name", {
                    required: { value: true, message: "Campo requerido" },
                    })} type="text" id="name" placeholder="John" className={`p-2 rounded bg-white w-full ${errors.bank ? "border-red-500" : ""}`} />
                </div>
                <div className="flex flex-col w-full gap-y-2">
                    <label htmlFor="">Ingresa tu apellido:</label>
                    <input {...register("lastName", {
                    required: { value: true, message: "Campo requerido" },
                    })} type="text" id="lastName" placeholder="Doe" className={`p-2 rounded bg-white w-full ${errors.bank ? "border-red-500" : ""}`} />
                </div>
                <div className="flex flex-col w-full gap-y-2">
                    <label htmlFor="">Ingresa tu teléfono:</label>
                    <div>
                        <select id="phonecode" {...register("phonecode", {
                            required: { value: true, message: "Campo requerido" },
                        })} className={`p-2 rounded bg-white w-full ${errors.bank ? "border-red-500" : ""}`}>
                            <option value="" disabled selected>Selecciona el código de tu país</option>
                            {
                                countries && countries.map((country, i) => (<option key={i} value={`${country.idd.root}${country.idd.suffixes[0]}`}>{`${country.flag} ${country.translations.spa.common} (${country.idd.root}${country.idd.suffixes[0]})`}</option>))
                            }
                        </select>
                        <input {...register("phone", {
                            required: { value: true, message: "Campo requerido" },
                        })} type="text" id="phone" placeholder="12345678" className={`p-2 rounded bg-white w-full ${errors.bank ? "border-red-500" : ""}`} />
                    </div>
                </div>
                <div className="flex flex-col w-full gap-y-2">
                    <label htmlFor="">Ingresa tu ciudad:</label>
                    <input {...register("city", {
                    required: { value: true, message: "Campo requerido" },
                    })} type="text" id="city" placeholder="Barcelona" className={`p-2 rounded bg-white w-full ${errors.bank ? "border-red-500" : ""}`} />
                </div>
                <div className="flex flex-col w-full gap-y-2">
                    <label htmlFor="">Ingresa tu dirección:</label>
                    <input {...register("address", {
                    required: { value: true, message: "Campo requerido" },
                    })} type="text" id="address" placeholder="Carrer de la Ciutat" className={`p-2 rounded bg-white w-full ${errors.bank ? "border-red-500" : ""}`} />
                </div>
                <div className="flex flex-col w-full gap-y-2">
                    <label htmlFor="">Ingresa tu codigo postal:</label>
                    <input {...register("zipCode", { minLength: 5,
                    required: { value: true, message: "Campo requerido" },
                    })} type="text" id="zipCode" placeholder="12345" className={`p-2 rounded bg-white w-full ${errors.bank ? "border-red-500" : ""}`} />
                </div>
                <div className="flex flex-col w-full gap-y-2">
                    <label htmlFor="">Ingresa tu fecha de nacimiento:</label>
                    <div className="flex gap-x-3">
                        <input {...register("dd", { min: 1, max: 31,
                    required: { value: true, message: "Campo requerido" },
                    })} type="text" id="dd" placeholder="DD" className={`p-2 rounded bg-white w-20 ${errors.bank ? "border-red-500" : ""}`} />
                        <input {...register("mm", { min: 1, max: 12,
                    required: { value: true, message: "Campo requerido" },
                    })} type="text" id="mm" placeholder="MM" className={`p-2 rounded bg-white w-20 ${errors.bank ? "border-red-500" : ""}`} />
                        <input {...register("aaaa", { min: 1990, max: 2024,
                    required: { value: true, message: "Campo requerido" },
                    })} type="text" id="aaaa" placeholder="AAAA" className={`p-2 rounded bg-white w-20 ${errors.bank ? "border-red-500" : ""}`} />
                    </div>
                </div>
                {
                profile?.idDocument?.isLoaded ?
                <Button
                variant={"ghost"}
                className="bg-pink text-white w-full p-3 m-3 rounded-xl font-bold text-lg mx-auto"
                >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Enviar'}
                </Button>
                :
                <Button
                variant={"ghost"}
                className="bg-pink text-white w-full p-3 m-3 rounded-xl font-bold text-lg mx-auto"
                onClick={() => setIsIdModalOpen(true)}
                >
                    Carga tu documento de Identidad
                </Button>
                
            }
            </div>
            }
            
            {cuentaEnviada && (
                <div className="fixed top-0 z-10 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-xl">
                        <CuentaEnviada
                        close={close}
                        />
                    </div>
                </div>
            )}
            {cuentaError && (
                <div className="fixed top-0 z-10 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-xl">
                        <ErrorCuenta
                        close={close}
                        />
                    </div>
                </div>
            )}
            {isIdModalOpen && (
                <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-xl">
                        <PassportId closeIdModal={closeIdModal} />
                    </div>
                </div>
            )}
        </form>
    )
};

export default BankAccount;

