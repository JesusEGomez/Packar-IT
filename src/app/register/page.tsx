'use client'
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaExclamationCircle } from "react-icons/fa";

interface FormInputs {
  fullname: string;
  email: string;
  password: string;
  //confirmPassword: string;
}

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = data => {
    const fetchData = async () => {
      const response = await fetch('/api/auth/signup',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    }
    try {
      fetchData();
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div>
      <form className='flex bg-pink flex-col p-4 gap-y-2' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-3xl font-bold text-white mb-3'>Registro</h1>
        <label htmlFor='fullname' className='text-white'>Nombre:</label>

        <input className='p-3 rounded block mb-2 bg-slate-100 text-black' 
        type="text" 
        {...register('fullname', 
        { required: {value: true, message: 'Campo requerido'},
        minLength: { value: 3, message: 'Mínimo 3 caracteres'} })} 
        />

        {
          errors.fullname && <span className='text-white flex gap-x-3'><FaExclamationCircle /> {errors.fullname.message}</span>
        }
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
        {/* <label htmlFor='confirmPassword' className='text-white'>Confirma tu contraseña:</label>
        <input className='p-3 rounded block mb-2 bg-slate-100 text-black' type="password" {...register('confirmPassword', { required: {value: true, message: 'Campo requerido'} })} />
        {
          errors.confirmPassword && <span className='text-white flex gap-x-3'><FaExclamationCircle />{errors.confirmPassword.message}</span>
        } */}

        <button className='w-full bg-black text-white rounded-lg p-3'>
          Registrar
        </button>
      </form>
    </div>
  );
}
