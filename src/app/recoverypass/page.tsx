import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaExclamationCircle } from 'react-icons/fa';

interface FormInputs {
    email: string
}
function page() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
      console.log(data); 
    }
  return (
    <div className='m-3'>

      <h1 className='text-3xl mb-10'>¿Has olvidado tu contraseña?</h1>
      <p className='text-sm mb-10 w-1/2'>¡No te preocupes! Por favor, introduce el email asociado a tu cuenta.</p>  
      <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='email' className='text-white'>Email:</label>
        <input className='p-3 rounded block mb-2 bg-slate-100 text-black' 
        type="email" 
        {...register('email', 
        { required: {value: true, message: 'Campo requerido'} })} 
        />

        {
          errors.email && <span className='text-white flex gap-x-3'><FaExclamationCircle />{errors.email.message}</span>
        }
      </form>
    </div>
  )
}

export default page