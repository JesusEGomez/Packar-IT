import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GiWeight } from "react-icons/gi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { LuFolderInput } from "react-icons/lu";
import { SlSizeFullscreen } from "react-icons/sl";
import { TbTriangleSquareCircle } from "react-icons/tb";

type FormInputs = {
  type: string;
  name: string;
  size1: string;
  size2: string;
  size3: string;
  weight: string;
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
      weigth: data.weight,
      photoProduct: img,
      articulosEspeciales: data.name,
    });
    props.closeModal({
      type: "Special",
      name: data.name,
      size: `${data.size1}x${data.size2}x${data.size3}`,
      weigth: data.weight,
      photoProduct: img,
      articulosEspeciales: data.name,
    });
  };

  return (
    <div className="pr-4 pl-4 pt-16 pb-16 max-h-screen overflow-y-auto scrollbar-hidden">
      <div>
        <Button onClick={props.justClose} variant={"ghost"}>
          <IoMdArrowRoundBack />
        </Button>
      </div>
      <form
        className="flex flex-col items-center p-2 mb-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Selecciona tu tipo de producto</h1>
        <div className="flex items-center border-b m-auto w-full gap-x-2">
          <TbTriangleSquareCircle className=" ml-4" size={20} />
          <input
            placeholder="Producto"
            className="p-3 text-black"
            type="text"
            id="name"
            {...register("name", {
              required: { value: false, message: "Campo requerido" },
              min: { value: 0, message: "El valor mínimo es 0" },
            })}
          />
        </div>
        <div className="flex items-center border-b m-auto w-full gap-x-2">
          <SlSizeFullscreen className="ml-4" size={20} />
          <input
            placeholder="cm"
            className="p-3 text-black w-16 rounded"
            type="number"
            id="size1"
            {...register("size1", {
              required: { value: false, message: "Campo requerido" },
              min: { value: 0, message: "El valor mínimo es 0" },
            })}
          />
          x
          <input
            placeholder="cm"
            className="p-3 text-black w-16 rounded"
            type="number"
            id="size2"
            {...register("size2", {
              required: { value: false, message: "Campo requerido" },
              min: { value: 0, message: "El valor mínimo es 0" },
            })}
          />
          x
          <input
            placeholder="cm"
            className="p-3 text-black w-16 rounded"
            type="number"
            id="size3"
            {...register("size3", {
              required: { value: false, message: "Campo requerido" },
            })}
          />
        </div>
        <div className="flex items-center border-b m-auto w-full gap-x-2">
          <GiWeight className=" ml-4" size={20} />
          <input
            placeholder="Peso(kg)"
            className="p-3 text-black"
            type="number"
            id="weight"
            {...register("weight", {
              required: { value: false, message: "Campo requerido" },
              pattern: {
                value: /^[0-9]*$/,
                message: "Solo se permiten números",
              },
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
          >
            {img ? (
              <img
                className="m-2"
                src={img}
                alt="Product Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
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
