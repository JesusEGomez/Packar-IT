"use client";
import { LuFolderInput } from "react-icons/lu";
import { ChangeEvent, useRef } from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IoMdArrowRoundBack } from "react-icons/io";

require("dotenv").config();

interface DriveLicenseProps {
  onClose: () => void;
}

export default function DriveLicense(props: any) {
  const frontFileInputRef = useRef<HTMLInputElement>(null);
  const backFileInputRef = useRef<HTMLInputElement>(null);

  const [imgFront, setImgFront] = useState<string | null>(null);
  const [imgBack, setImgBack] = useState<string | null>(null);
  const [disable, setDisable] = useState(true);
  const navigate = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (imgFront && imgBack) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [imgFront, imgBack]);

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

  const handleFileChange = async (
    e: ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
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

          const fileName = ans.secure_url.split("/").pop();
          setImage(fileName);
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
        setImgFront(imgDataUrl);
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
        setImgBack(imgDataUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleBotonPic = async () => {
   
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
          frontPhoto: imgFront,
          backPhoto: imgBack,
        },
      }),
    });
    props.closeLicenceModal();
  };

  return (
   <div className="flex flex-col items-center justify-center w-full h-full my-auto  mb-5 mr-5  mt-60">
      <Button onClick={props.closeLicenceModal} variant={"ghost"}>
        <IoMdArrowRoundBack />
      </Button>
      <div className="flex flex-col justify-center items-center text-l ">
        <h1 className="text-3xl font-black text-left">Carnet de conducir</h1>
      </div>
      <div>
        <form>
          <div className="flex flex-col justify-center items-center p-4 gap-y-5">
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
               {imgFront && (
               <img
               src={imgFront}
               alt="Front Preview"
               style={{ maxWidth: "100%", maxHeight: "100%", backgroundRepeat: "no-repeat" , backgroundSize: "cover" }}
             />
             
              )}
              {!imgFront && <LuFolderInput size={30} style={{ color: "gray" }} />}
            </section>
            <input
              type="file"
              ref={frontFileInputRef}
              onChange={handleFrontFileChange}
              style={{ display: "none" }}
            />
          </div>
          <div className="flex flex-col justify-center items-center p-4 gap-y-5">
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
                {imgBack && (
                <img
                  src={imgBack}
                  alt="Back Preview"
                  style={{ maxWidth: "100%", maxHeight: "100%" ,  }}
                />
              )}
              {!imgBack && <LuFolderInput size={30} style={{ color: "gray" }} />}
            </section>
            <input
              type="file"
              ref={backFileInputRef}
              onChange={handleBackFileChange}
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
