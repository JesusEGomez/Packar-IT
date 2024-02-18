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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [img2, setImg2] = useState<string | null>(null);
  const [img3, setImg3] = useState<string | null>(null);
  const [type, setType] = useState<string | null>("");
  const [numeroDni, setNumeroDni] = useState("");
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (img2 && img3 && type && numeroDni) {
      setDisable(false);
      //console.log(img2, img3, type, numeroDni);
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
        const ans = await response.json();
        //console.log("Cloudinary response:", ans);
        if (response.ok) {

          const fileName = ans.secure_url; // Extrae el nombre del archivo de la URL
          if (!img2) {
            //console.log("Setting img2:", fileName);
            setImg2(fileName);
            
          } else {
            //console.log("Setting img3:", fileName);
            setImg3(fileName);
          }
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  const handleFrontFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        const imgDataUrl = reader.result as string;
        //console.log("Front file read:", imgDataUrl);
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
        //console.log("Back file read:", imgDataUrl);
        setImg3(imgDataUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleBotonPic = async () => {
    try {
      const user = await fetch(
        `/api/auth/myid/?email=${session?.user?.email}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const userAns = await user.json();
      const updatedProfile = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userAns._id,
          idDocument: {
            type: type === "dni" ? "DNI" : "Pasaporte",
            number: numeroDni,
            frontPhoto: img2,
            backPhoto: img3,
            isLoaded: true
          },
        }),
      });
      const updated = await updatedProfile.json()
      // Mostrar mensaje de éxito
      setShowSuccessMessage(true);

      // Cerrar el modal después de 3 segundos
      setTimeout(() => {
        setShowSuccessMessage(false);
        props.closeIdModal();
      }, 3000);
    } catch (error) {
      console.error("Error al cargar la documentación:", error);
    }
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value.toLowerCase();
    //console.log("Selected Type:", selectedType);
    setType(selectedType);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full  h-screen   ">
      <div className="overflow-y-auto    py-10">
        <div className=" flex flex-wrap mt-10 ">
          <Button onClick={props.closeIdModal} variant={"ghost"}>
            <IoMdArrowRoundBack />
          </Button>
          <h1 className="text-3xl font-black text-left w-full py-3">
            DNI o Pasaporte
          </h1>
        </div>
        <form className="flex flex-col justify-center items-center mr-5">
          <div className="flex flex-col justify-center items-center ">
            <div className="mb-4">
              <label htmlFor="numeroDni" className="text-left block mb-2">
                Numero de DNI o Pasaporte
              </label>
              <input
                id="numeroDni"
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
                }}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="documentType" className="text-left block mb-2">
                Tipo de Documentación
              </label>
              <select
                id="documentType"
                onChange={handleTypeChange}
                className="p-4 border rounded-sm cursor-pointer bg-white text-slate-400"
                style={{
                  width: "300px",
                }}
              >
                <option value="" disabled selected>
                  Tipo de documento
                </option>
                <option className="text-black" value="dni">
                  DNI
                </option>
                <option className="text-black" value="pasaporte">
                  Pasaporte
                </option>
              </select>
            </div>

            <div className="mb-4">
              <label className="text-left block mb-2">
                Foto para la parte delantera
              </label>
              <section
                className="border rounded-xl cursor-pointer flex justify-center items-center"
                style={{
                  width: "300px",
                  height: "200px",
                }}
                onClick={() => handleDivClick(frontFileInputRef)}
              >
                {img2 && (
                  <img
                    src={img2}
                    alt="Front Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  />
                )}
                {!img2 && (
                  <LuFolderInput size={100} style={{ color: "gray" }} />
                )}
              </section>
              <input
                type="file"
                ref={frontFileInputRef}
                //onChange={handleFrontFileChange}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
            <div className="mb-4">
              <label className="text-left block mb-2">
                Foto para la parte trasera
              </label>
              <section
                className="border rounded-xl cursor-pointer flex justify-center items-center"
                style={{
                  width: "300px",
                  height: "200px",
                }}
                onClick={() => handleDivClick(backFileInputRef)}
              >
                {img3 && (
                  <img
                    src={img3}
                    alt="Back Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  />
                )}
                {!img3 && (
                  <LuFolderInput size={100} style={{ color: "gray" }} />
                )}
              </section>
              <input
                type="file"
                ref={backFileInputRef}
                //onChange={handleBackFileChange}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </form>
        <div className="flex justify-center m-2">
          <button
            className="bg-pink disabled:opacity-70 text-white font-bold rounded-lg p-3"
            disabled={disable}
            onClick={handleBotonPic}
          >
            Cargar documentación
          </button>
        </div>
        {showSuccessMessage && (
          <div className="flex justify-center">
            <p className="my-2 text-green-500">
              Documentación cargada con éxito.
            </p>
          </div>
        )}
        <div className="flex justify-items-start items-start">
          <p className="my-5 mx-4 px-8 text-gray-600 font-bold text-left">
            Sube tus documentos identificativos para poder verificar tu perfil.
            Los perfiles verificados generan más confianza dentro de la
            comunidad.
          </p>
        </div>
      </div>
    </div>
  );
}
