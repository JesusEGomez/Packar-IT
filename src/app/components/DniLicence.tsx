"use client";
"use client";
import { LuFolderInput } from "react-icons/lu";
import { ChangeEvent, useRef } from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { IoMdArrowRoundBack } from "react-icons/io";

require("dotenv").config();

export default function PassportId(props: any) {
  const frontFileInputRef = useRef<HTMLInputElement>(null);
  const backFileInputRef = useRef<HTMLInputElement>(null);

  const [img2, setImg2] = useState<string | null>(null);
  const [img3, setImg3] = useState<string | null>(null);
  const [type, setType] = useState<string | null>("");
  const [numeroDni, setNumeroDni] = useState("");
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (img2 && img3 && type && numeroDni) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [img2, img3, type, numeroDni]);

  const handleDivClick = async (
    fileInputRef: React.RefObject<HTMLInputElement>
  ) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const cloudName = process.env.CLOUD_NAME;
  const cloudPreset = process.env.CLOUD_PRESET;
  const { data: session } = useSession();

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
          // console.log(ans);

          const fileName = ans.secure_url.split("/").pop(); // Extrae el nombre del archivo de la URL
          if (!img2) {
            setImg2(fileName);
          } else {
            setImg3(fileName);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleFrontFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const imgDataUrl = reader.result as string;
        setImg2(imgDataUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleBackFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const imgDataUrl = reader.result as string;
        setImg3(imgDataUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleBotonPic = async () => {
    // console.log("Valor de img (front):", img2);
    // console.log("Valor de img1 (back):", img3);
    const user = await fetch(`/api/auth/myid/?email=${session?.user?.email}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userAns = await user.json();
    const updatedProfile = await fetch("/api/auth/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userAns,
        idDocument: {
          type: type === "dni" ? "DNI" : "Pasaporte",
          number: numeroDni,
          frontPhoto: img2,
          backPhoto: img3,
        },
      }),
    });
    props.closeIdModal();
  };
  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value.toLowerCase();
    //console.log("Selected Type:", selectedType);
    setType(selectedType);
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-full my-auto mb-5 mt-60 mr-5">
      <div className="m-4 flex flex-col justify-center items-start   text-center">
      <Button onClick={props.closeIdModal} variant={"ghost"}>
        <IoMdArrowRoundBack />
      </Button>
        <h1 className="text-3xl font-black text-left">DNI o Pasaporte</h1>
      </div>
      <form className="flex flex-col justify-center items-center mr-10">
        <div className="flex flex-col justify-center items-center p-4">
          <div>
            <p className="text-left">Tipo de Documentación</p>
            <select
              onChange={handleTypeChange}
              className="p-4 border rounded-sm cursor-pointer bg-white text-slate-400"
              style={{
                width: "300px",
                height: "5px",
                borderColor: "gray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <option className="text-black" value="dni">
                DNI
              </option>
              <option className="text-black" value="pasaporte">
                Pasaporte
              </option>
            </select>
          </div>
          <div>
            <p className="text-left">Numero de DNI o Pasaporte</p>
            <input
              type="text"
              placeholder="123456789"
              className="p-4 border rounded-sm cursor-pointer"
              value={numeroDni}
              onChange={(e) => {
                const inputValue = e.target.value;
                const onlyNumbers = inputValue.replace(/[^0-9]/g, "");
                setNumeroDni(onlyNumbers);
              }}
              style={{
                width: "300px",
                height: "5px",
                borderColor: "gray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </div>
          <p className="text-left">Foto para la parte delantera</p>
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
            onClick={() => handleDivClick(frontFileInputRef)}
          >
            {img2 && (
              <img
                src={img2}
                alt="Front Preview"
                style={{ maxWidth: "100%", maxHeight: "100%", backgroundRepeat: "no-repeat" , backgroundSize: "cover" }}
              />
            )}
            {!img2 && <LuFolderInput size={30} style={{ color: "gray" }} />}
          </section>
          <input
            type="file"
            ref={frontFileInputRef}
            onChange={handleFrontFileChange}
            style={{ display: "none" }}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <p>Foto para la parte trasera</p>
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
            onClick={() => handleDivClick(backFileInputRef)}
          >
            {img3 && (
              <img
                src={img3}
                alt="Back Preview"
                style={{ maxWidth: "100%", maxHeight: "100%", backgroundRepeat: "no-repeat" , backgroundSize: "cover" }}
              />
            )}
            {!img3 && <LuFolderInput size={30} style={{ color: "gray" }} />}
          </section>
          <input
            type="file"
            ref={backFileInputRef}
            onChange={handleBackFileChange}
            style={{ display: "none" }}
          />
        </div>
      </form>
      <div className=" flex justify-center m-2 ">
        <button
          className="bg-pink  disabled:opacity-70 text-white font-bold rounded-b-sm p-3"
          disabled={disable}
          onClick={handleBotonPic}
        >
          Cargar documentación
        </button>
      </div>
      <div className="flex justify-items-start items-start  ">
        <p className="my-5 mx-4 px-8 text-gray-600 font-bold text-left">
          Sube tus documentos identificativos para poder verificar tu perfil.
          Los perfiles verificados generan más confianza dentro de la comunidad.
        </p>
      </div>
    </div>
  );
} 

