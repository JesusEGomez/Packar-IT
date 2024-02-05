"use client";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsBoxSeam } from "react-icons/bs";
import { IoIosArrowDown, IoMdArrowRoundBack } from "react-icons/io";
import { LuFolderInput } from "react-icons/lu";
import { TbTriangleSquareCircle } from "react-icons/tb";
import { GiWeight } from "react-icons/gi";
import { SlSizeFullscreen } from "react-icons/sl";

type FormInputs = {
  type: string;
  name: string;
  size1: string;
  size2: string;
  size3: string;
  weigth: string;
  photoProduct: string;
  articulosEspeciales: string;
};

const SpecialProdModal = (props: any) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [img, setImg] = useState<string | null>(null);
  const [disabled, setDisable] = useState<boolean>(true);
  const cloudName = process.env.CLOUD_NAME;
  const cloudPreset = process.env.CLOUD_PRESET;

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=${cloudPreset}`,
          {
            method: "POST",
            body: formData,
          }
        );
        if (response.ok) {
          const ans = await response.json();

          setImg(ans.secure_url);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    img && setDisable(false);
  }, [img]);

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
      type: "Special",
      name: data.name,
      size: `${data.size1}x${data.size2}x${data.size3}`,
      weigth: data.weigth,
      photoProduct: img,
      articulosEspeciales: data.name,
    });
    props.closeModal({
      type: "Special",
      name: data.name,
      size: `${data.size1}x${data.size2}x${data.size3}`,
      weigth: data.weigth,
      photoProduct: img,
      articulosEspeciales: data.name,
    });
  };
  
  return (
    <div className="px-4">
    <form
      className="flex flex-col items-center p-2 mb-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Button onClick={props.justClose} variant={"ghost"}>
          <IoMdArrowRoundBack />
        </Button>
      </div>
      <h1>Selecciona tu tipo de producto</h1>
      <div className="flex items-center border-b m-auto w-full gap-x-2">
          <TbTriangleSquareCircle className="text-slate-400 ml-4" size={20} />
          <input
            placeholder="Producto"
            className="p-3 text-slate-300"
            type="text"
            id="name"
            {...register("name", {
              required: { value: false, message: "Campo requerido" },
            })}
          />
        </div>
        <div className="flex items-center border-b m-auto w-full gap-x-2">
          <SlSizeFullscreen className="text-slate-400 ml-4" size={20} />
          <input
            placeholder="cm"
            className="p-3 text-slate-300 w-16 rounded"
            type="text"
            id="size1"
            {...register("size1", {
              required: { value: false, message: "Campo requerido" },
            })}
          />
          x
          <input
            placeholder="cm"
            className="p-3 text-slate-300 w-16 rounded"
            type="text"
            id="size2"
            {...register("size2", {
              required: { value: false, message: "Campo requerido" },
            })}
          />
          x
          <input
            placeholder="cm"
            className="p-3 text-slate-300 w-16 rounded"
            type="text"
            id="size3"
            {...register("size3", {
              required: { value: false, message: "Campo requerido" },
            })}
          />
        </div>
        <div className="flex items-center border-b m-auto w-full gap-x-2">
        <GiWeight className="text-slate-400 ml-4" size={20}/>
          <input
            placeholder="Peso(kg)"
            className="p-3 text-slate-300"
            type="text"
            id="weight"
            {...register("weigth", {
              required: { value: false, message: "Campo requerido" },
            })}
          />
        </div>
      <div className="flex flex-col justify-center items-center p-4 gap-y-5">
        <h1 className="text-2xl">Añade una imagen de tu envío</h1>
        <section
         className="border rounded-xl cursor-pointer"
         style={{
           width: "300px",
           height: "200px",
           borderColor: "gray",
           display: "flex",
           alignItems: "center",
           justifyContent: "center",
         }}
          onClick={handleDivClick}
        > {img ? (
          <img
            className="m-2"
            src={img}
            alt="Product Preview"
            style={{ maxWidth: "100%", maxHeight: "100%" , backgroundRepeat: "no-repeat" , backgroundSize: "cover" }}
          />
        ) : (
          <LuFolderInput size={70} />
        )}
        </section>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
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
    </div>
  );
};

export default SpecialProdModal;
