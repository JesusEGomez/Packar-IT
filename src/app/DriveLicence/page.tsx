"use client";
import { LuFolderInput } from "react-icons/lu";
import { ChangeEvent, useRef } from "react";
import { useState } from "react";

require("dotenv").config();

export default function DriveLicense() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [img, setImg] = useState<string>("");

  const handleDivClick = async () => {
    if (fileInputRef.current) {
      // Abrir el explorador de archivos al hacer clic en el contenedor
      fileInputRef.current.click();
    }
  };

  const cloudName = process.env.CLOUD_NAME;
  const cloudPreset = process.env.CLOUD_PRESET;

  console.log(cloudName, cloudPreset);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dj8g1egez/image/upload?upload_preset=rc9fwqrr`,
          {
            method: "POST",
            body: formData,
          }
        );
        if (response.ok) {
          const ans = await response.json();
          console.log(ans);

          setImg(ans.secure_url);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div></div>
      <div className="flex flex-col justify-center items-center p-4 gap-y-5 text-l">
        <h1 className="text-3xl font-black text-left">Carnet de conducir</h1>
      </div>
      <div>
        <form>
          <div className="flex flex-col justify-center items-center p-4 gap-y-5">
            <p className="text-left">Foto para la parte delantera</p>
            <div
              className="p-10 border rounded-xl cursor-pointer"
              style={{
                width: "300px",
                borderColor: "gray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleDivClick}
            >
              <LuFolderInput size={30} style={{ color: "gray" }} />
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          <div className="flex flex-col justify-center items-center p-4 gap-y-5">
            <p>Foto para la parte trasera</p>
            <div
              className="p-10 border rounded-xl cursor-pointer"
              style={{
                width: "300px",
                borderColor: "gray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleDivClick}
            >
              <LuFolderInput size={30} style={{ color: "gray" }} />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          <button type="submit">Subir Imagen</button>
        </form>
      </div>
      <div className="flex justify-items-start items-start">
        <p className="my-5 mx-4 px-8 text-gray-600 font-bold text-left">
          Sube tus documentos identificativos para poder verificar tu perfil.
          Los perfiles verificados generan más confianza dentro de la comunidad.
        </p>
      </div>
    </div>
  );
}



// `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=${cloudPreset}`,