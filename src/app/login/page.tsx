'use client'

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaExclamationCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface FormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = data => {
    console.log(data);
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
        <button className='bg-white p-3 m-3 w-fit rounded-full mx-auto'>
          <FcGoogle size={30}/>
        </button>
    </div>
  )
}
