"use client";
import { LuFolderInput } from "react-icons/lu";
import { ChangeEvent, useRef } from "react";

export default function DriveLicense() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
  };

  const handleDivClick = async () => {
    if (fileInputRef.current) {
      // Abrir el explorador de archivos al hacer clic en el contenedor
      fileInputRef.current.click();
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      const file = fileInputRef.current?.files?.[0];
      if (file) {
        formData.append('file', file);
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload?api_key=${process.env.CLOUD_API_KEY}&upload_preset=${process.env.CLOUD_PRESET}`,
          {
            method: "POST",
            body: formData,
          }
        );

        console.log("Respuesta de Cloudinary:", response);

        if (response.ok) {
          const data = await response.json();
          console.log("Imagen subida:", data);
        } else {
          console.error(
            "Error en la solicitud:",
            response.status,
            response.statusText
          );
        }
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }
  };

  return (
    <div>
      <div></div>
      <div className="flex flex-col justify-center items-center p-4 gap-y-5 text-l">
        <h1 className="text-3xl font-black text-left">Carnet de conducir</h1>
      </div>
      <div>
        <form onSubmit={handleFormSubmit}>
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
