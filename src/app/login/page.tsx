'use client'

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaExclamationCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface FormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if(res?.error) alert(res.error);
      navigate.push('/');
      console.log(res, data);
    } catch (error) {
        console.log(error);

    }
  }
  const googleBtn = async () =>{
    const res = await signIn('google',{
      redirect: false,
    });
    navigate.push('/');
  }

  return (
    <div className='flex flex-col bg-pink'>
      <form className='flex flex-col p-4 gap-y-2' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='email' className='text-white'>Email:</label>
        <input className='p-3 rounded block mb-2 bg-slate-100 text-black' 
        type="email" 
        {...register('email', 
        { required: {value: true, message: 'Campo requerido'} })} 
        />

        {
          errors.email && <span className='text-white flex gap-x-3'><FaExclamationCircle />{errors.email.message}</span>
        }
        <label htmlFor='password' className='text-white'>Contraseña:</label>

        <input className='p-3 rounded block mb-2 bg-slate-100 text-black' 
        type="password" 
        {...register('password', 
        { required: {value: true, message: 'Campo requerido'}, 
        minLength: { value: 8, message: 'Mínimo 8 caracteres'} })} 
        />

        {
          errors.password && <span className='text-white flex gap-x-3'><FaExclamationCircle />{errors.password.message}</span>
        }
        <button className='w-full bg-black text-white rounded-lg p-3'>
          Ingresar
        </button>
      </form>
        <p className='flex w-full justify-center text-white'>o</p>
        <button onClick={() => googleBtn()} className='bg-white p-3 m-3 w-fit rounded-full mx-auto'>
          <FcGoogle size={30}/>
        </button>
    </div>
  )
}
