import { Button } from "@/components/ui/button";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaExclamationCircle } from "react-icons/fa";
import { TbTriangleSquareCircle } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuFolderInput } from "react-icons/lu";

interface FormInputs {
  types: string;
  name: string;
  size: string;
  weight: string;
}

function ProdForm(props: any) {
  const [img, setImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [disabled, setDisable] = useState<boolean>(true);
  const cloudName = process.env.CLOUD_NAME;
    const cloudPreset = process.env.CLOUD_PRESET;

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file){
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=${cloudPreset}`,
        {
          method: "POST",
          body: formData,
        })
        if(response.ok){
          const ans = await response.json();
          console.log(ans);
          
          setImg(ans.secure_url);
        }
      } catch (error) {
        console.log(error);
        
      }
    }
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    props.closeFirstModal({
      type: data.types,
      name: data.name,
      size: data.size,
      weigth: data.weight,
      photoProduct: img,
      articulosEspeciales: 'noSpecial'
    });
    props.closeModal({
      type: data.types,
      name: data.name,
      size: data.size,
      weigth: data.weight,
      photoProduct: img,
      articulosEspeciales: 'noSpecial'
    });
  };
  const close = () => {
    props.closeModal();
  };

  useEffect(() => {
    img && setDisable(false);
  },[img]);

  return (
    <div>
      <Button onClick={() => close()} variant={"ghost"}>
        <IoMdArrowRoundBack />
      </Button>
      <div className="flex">
        <h1 className="text-xl font-bold mb-4">¿Qué vas a enviar?</h1>
        <FaExclamationCircle className="text-slate-400" />
      </div>
      <p className="text-sm text-slate-700">
        Para poder ofreferte las mejores opciones, detallanos informacion sobre
        tu envío.
      </p>
      <form
        className="flex flex-col items-center p-2 mb-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center border-b m-auto w-full">
          <TbTriangleSquareCircle className="text-slate-400" size={30} />
          <select
            className="p-2 rounded bg-white text-slate-400 w-full"
            id="types"
            {...register("types", {
              required: { value: true, message: "Campo requerido" },
            })}
          >
            <option value="" disabled selected>
              Categoría de tu producto
            </option>
            <option value="Bebé">Bebé</option>
            <option value="Belleza">Belleza</option>
            <option value="Bricolaje y herramientas">
              Bricolaje y herramientas
            </option>
            <option value="Deportes">Deportes</option>
            <option value="Electrónica">Electrónica</option>
            <option value="Equipaje">Equipaje</option>
          </select>
        </div>
        <div className="flex items-center border-b m-auto w-full">
          <BsBoxSeam className="text-slate-400" size={30} />
          <input
            placeholder="Producto"
            className="p-3 text-slate-300"
            type="text"
            id="name"
            {...register("name", {
              required: { value: true, message: "Campo requerido" },
            })}
          />
          <IoIosArrowDown className="text-slate-400" />
        </div>
        <div className="flex items-center border-b m-auto w-full">
          <select
            className="p-2 rounded bg-white text-slate-400 w-full"
            id="size"
            {...register("size", {
              required: { value: true, message: "Campo requerido" },
            })}
          >
            <option value="" disabled selected>
              Tamaño
            </option>
            <option value="Pequeño">Pequeño</option>
            <option value="Mediano">Mediano</option>
            <option value="Grande">Grande</option>
          </select>
        </div>
        <div className="flex items-center border-b m-auto w-full">
          <select
            className="p-2 rounded bg-white text-slate-400 w-full"
            id="weight"
            {...register("weight", {
              required: { value: true, message: "Campo requerido" },
            })}
          >
            <option value="" disabled selected>
              Peso
            </option>
            <option value="<5kg">{`<5kg`}</option>
            <option value="5-10kg">5-10kg</option>
            <option value="15-30kg">15-30kg</option>
          </select>
        </div>

        <div className='flex flex-col justify-center items-center p-4 gap-y-5'>
            <h1 className='text-2xl'>Añade una imagen de tu envío</h1>
            <div className='p-10 border w-fit rounded-xl cursor-pointer' onClick={handleDivClick}>
              <LuFolderInput size={70} />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

        <Button
          variant={"ghost"}
          disabled={disabled || !isValid}
          className="bg-pink text-white w-full p-3 m-3 rounded-xl font-bold text-lg mx-auto"
        >
          Siguiente
        </Button>
      </form>
    </div>
  );
}

export default ProdForm;
