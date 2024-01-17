'use client'
import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { LuFolderInput } from "react-icons/lu";


type FormInputs = {
    selected: string;
}

const SpecialProdModal = (props: any) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [img, setImg] = useState<string | null>(null);
    const [disabled, setDisable] = useState<boolean>(true);
  
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if(file){
        const formData = new FormData();
        formData.append('file', file);
        try {
          const response = await fetch(`https://api.cloudinary.com/v1_1/dwj6wtgtb/image/upload?upload_preset=oxxsnr7q`,
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

    useEffect(() => {
      img && setDisable(false);
    },[img]);

    const handleDivClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
    const {
        register,
        handleSubmit,
        formState: { isValid },
      } = useForm<FormInputs>();
      const onSubmit: SubmitHandler<FormInputs> = (data) => {
        props.closeFirstModal({
          type: 'Special',
          name: data.selected,
          size: 'Special',
          weigth: 'Special',
          photoProduct: img,
          articulosEspeciales: data.selected
        });
        props.closeModal({
          type: 'Special',
          name: data.selected,
          size: 'Special',
          weigth: 'Special',
          photoProduct: img,
          articulosEspeciales: data.selected
        });
      };
      const close = () => {
        props.closeModal();
      };
    return(
        <form className="flex flex-col items-center p-2 mb-10" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Button onClick={() => close()} variant={"ghost"}>
                    <IoMdArrowRoundBack />
                </Button>
            </div>
            <h1>Selecciona tu tipo de producto</h1>
            <select
            className="p-2 rounded bg-white text-slate-400 w-full"
            id="selected"
            {...register("selected", {
              required: { value: true, message: "Campo requerido" },
            })}
            >
                <option value="" disabled selected>
                  Escoje tu producto
                </option>
                <option value="Bicicleta">Bicicleta</option>
                <option value="Tabla de surf">Tabla de surf</option>
                <option value="Silla">Silla</option>
                <option value="Cama">Cama</option>
                <option value="TV">TV</option>
                <option value="Kayak">Kayak</option>
                <option value="Esquis">Esquis</option>
                <option value="Otro">Otro</option>
          </select>
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
          className="bg-pink text-white w-full p-3 m-3 rounded-xl font-bold text-lg mx-auto"
          disabled={disabled || !isValid}
          >
            Siguiente
          </Button>
        </form>
    )
};

export default SpecialProdModal;