'use client'

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Countryes = {
    cca2: string,
    idd: {
        root: string,
        suffixes: [string]
    },
    flag: any,
    name: any
}[];

type FormData = {
    countries: string,
    bank: string,
    name: string,
    lastName: string,
    phone: string,
    address: string,
    city: string,
    zipCode: string,
    dd: string,
    mm: string,
    aaaa: string,
    accountNumber: string
    phonecode:string
}

const BankAccount = (props:any) => {
    const [countries, setCountries] = useState<Countryes | null>(null);
    const localUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(localUser!);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
      } = useForm<FormData>();

      const onSubmit: SubmitHandler<FormData> = async (data) =>{
        console.log(data);
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
            userId: parsedUser.id,
            email: parsedUser.email
        }
        if(data){
            console.log(accountData);
            
            try {
                const createAccount = await fetch('/api/auth/pagoDriver',{
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(accountData)
                })
                props.closeAccount();
            } catch (error) {
                console.log(error);
                
            }
        }
      }
    useEffect(() => {
        const fetchCountries = async () => {
            const data = await fetch('https://restcountries.com/v3.1/region/europe?fields=cca2,idd,flag,name');
            const info = await data.json();
            setCountries(info);
        }
        fetchCountries();
    },[])
    return(
        <form className="flex flex-col items-center p-2 my-4 overflow-y-scroll" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-xl">Ingresa los datos de tu cuenta para recibir tus pagos</h1>
            <select {...register("countries", {
              required: { value: true, message: "Campo requerido" },
                })} id="countries" className={`p-2 rounded bg-white w-full ${errors.bank ? "border-red-500" : ""}`}>
                <option value="" disabled selected>Selecciona tu país</option>
                {
                    countries && countries.map((country) => (<option value={country.cca2}>{`${country.name.common} (${country.cca2})`}</option>))
                }
            </select>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="">Ingresa tu banco:</label>
                <input {...register("bank", {
                required: { value: true, message: "Campo requerido" },
                })} type="text" id="bank" placeholder="Banco de bilbao" className={`p-2 rounded bg-white w-full ${errors.bank ? "border-red-500" : ""}`} />
            </div>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="">Ingresa tu nro de cuenta:</label>
                <input {...register("accountNumber", {
                required: { value: true, message: "Campo requerido" },
                })} type="text" id="accountNumber" placeholder="12345678" className={`p-2 rounded bg-white w-full ${errors.bank ? "border-red-500" : ""}`} />
            </div>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="">Ingresa tu nombre:</label>
                <input {...register("name", {
                required: { value: true, message: "Campo requerido" },
                })} type="text" id="name" placeholder="John" className={`p-2 rounded bg-white w-full ${errors.bank ? "border-red-500" : ""}`} />
            </div>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="">Ingresa tu apellido:</label>
                <input {...register("lastName", {
                required: { value: true, message: "Campo requerido" },
                })} type="text" id="lastName" placeholder="Doe" className={`p-2 rounded bg-white w-full ${errors.bank ? "border-red-500" : ""}`} />
            </div>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="">Ingresa tu teléfono:</label>
                <div>
                    <select id="phonecode" {...register("phonecode", {
                        required: { value: true, message: "Campo requerido" },
                    })} className={`p-2 rounded bg-white w-full ${errors.bank ? "border-red-500" : ""}`}>
                        <option value="" disabled selected>Selecciona el código de tu país</option>
                        {
                            countries && countries.map((country) => (<option value={`${country.idd.root}${country.idd.suffixes[0]}`}>{`${country.flag}${country.idd.root}${country.idd.suffixes[0]} (${country.name.common})`}</option>))
                        }
                    </select>
                    <input {...register("phone", {
                        required: { value: true, message: "Campo requerido" },
                    })} type="text" id="phone" placeholder="12345678" className={`p-2 rounded bg-white w-full ${errors.bank ? "border-red-500" : ""}`} />
                </div>
            </div>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="">Ingresa tu ciudad:</label>
                <input {...register("city", {
                required: { value: true, message: "Campo requerido" },
                })} type="text" id="city" placeholder="Barcelona" className={`p-2 rounded bg-white w-full ${errors.bank ? "border-red-500" : ""}`} />
            </div>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="">Ingresa tu dirección:</label>
                <input {...register("address", {
                required: { value: true, message: "Campo requerido" },
                })} type="text" id="address" placeholder="Carrer de la Ciutat" className={`p-2 rounded bg-white w-full ${errors.bank ? "border-red-500" : ""}`} />
            </div>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="">Ingresa tu codigo postal:</label>
                <input {...register("zipCode", { minLength: 5,
                required: { value: true, message: "Campo requerido" },
                })} type="text" id="zipCode" placeholder="12345" className={`p-2 rounded bg-white w-full ${errors.bank ? "border-red-500" : ""}`} />
            </div>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="">Ingresa tu fecha de nacimiento:</label>
                <div className="flex gap-x-3">
                    <input {...register("dd", { min: 1, max: 31,
                required: { value: true, message: "Campo requerido" },
                })} type="text" id="dd" placeholder="DD" className={`p-2 rounded bg-white w-20 ${errors.bank ? "border-red-500" : ""}`} />
                    <input {...register("mm", { min: 1, max: 12,
                required: { value: true, message: "Campo requerido" },
                })} type="text" id="mm" placeholder="MM" className={`p-2 rounded bg-white w-20 ${errors.bank ? "border-red-500" : ""}`} />
                    <input {...register("aaaa", { min: 1990, max: new Date().getFullYear() - 18,
                required: { value: true, message: "Campo requerido" },
                })} type="text" id="aaaa" placeholder="AAAA" className={`p-2 rounded bg-white w-20 ${errors.bank ? "border-red-500" : ""}`} />
                </div>
            </div>
            
            <Button
              variant={"ghost"}
              className="bg-pink text-white w-full p-3 m-3 rounded-xl font-bold text-lg mx-auto"
            >
              Enviar
            </Button>

        </form>
    )
};

export default BankAccount;