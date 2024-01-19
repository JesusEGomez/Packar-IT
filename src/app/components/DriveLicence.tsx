"use client";
import { LuFolderInput } from "react-icons/lu";
import { ChangeEvent, useRef } from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

//require("dotenv").config();

interface DriveLicenseProps {
  onClose: () => void;
}

export default function DriveLicense (props:any) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [img, setImg] = useState<string | null>(null);
  const [img1, setImg1] = useState<string | null>(null);
  const [disable, setDisable] = useState(true);
  const navigate = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (img && img1) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [img, img1]);

  const handleDivClick = async () => {
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
          console.log(ans);

          const fileName = ans.secure_url.split("/").pop(); // Extrae el nombre del archivo de la URL
          if (!img) {
            setImg(fileName);
          } else {
            setImg1(fileName);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleBotonPic = async () => {
    console.log("Valor de img (front):", img);
    console.log("Valor de img1 (back):", img1);
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
        driverLicense: {
          frontPhoto: img,
          backPhoto: img1,
        },
      }),
    });
   props.closeLicenceModal()
  };

 

  return (
    <div className="m-8">
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
        </form>
      </div>
      <div>
        <button
          className="bg-pink w-full disabled:opacity-70 text-white font-bold rounded-b-sm p-3"
          disabled={disable}
          onClick={handleBotonPic}
        >
          Cargar documentación
        </button>
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
