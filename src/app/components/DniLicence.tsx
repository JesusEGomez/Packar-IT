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
    console.log("Efecto 1: Verificar condiciones para habilitar el botón");
    if (img2 && img3 && type && numeroDni) {
      console.log("Condiciones cumplidas, habilitando botón");
      setDisable(false);
    } else {
      console.log("Condiciones no cumplidas, deshabilitando botón");
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
    console.log("Manejando cambio de archivo...");
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
        console.log("Respuesta de Cloudinary:", ans);
        if (response.ok) {
          const fileName = ans.secure_url;
          if (!img2) {
            console.log("Configurando img2:", fileName);
            setImg2(fileName);
          } else {
            console.log("Configurando img3:", fileName);
            setImg3(fileName);
          }
        }
      } catch (error) {
        console.error("Error al subir el archivo:", error);
      }
    }
  };

  const handleFrontFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("Manejando cambio de archivo frontal...");
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const imgDataUrl = reader.result as string;
        console.log("Archivo frontal leído:", imgDataUrl);
        setImg2(imgDataUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleBackFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("Manejando cambio de archivo trasero...");
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const imgDataUrl = reader.result as string;
        console.log("Archivo trasero leído:", imgDataUrl);
        setImg3(imgDataUrl);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleModalClose = () => {
    console.log("Cerrando modal...");
    localStorage.setItem("frontImage", img2 ?? "");
    localStorage.setItem("backImage", img3 ?? "");

    props.closeIdModal();
  };

  const handleBotonPic = async () => {
    console.log("Manejando clic en el botón para cargar documentación...");
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
            isLoaded: true,
          },
        }),
      });
      const updated = await updatedProfile.json();
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        props.closeIdModal();
      }, 3000);
    } catch (error) {
      console.error("Error al cargar la documentación:", error);
    }
  };

  useEffect(() => {
    console.log("Efecto 2: Cargando imágenes desde el almacenamiento local...");
    if (typeof window !== "undefined") {
      console.log("Window está definido");
      const frontImage = localStorage.getItem("frontImage");
      const backImage = localStorage.getItem("backImage");

      if (frontImage !== null) {
        console.log(
          "Imagen frontal recibida en el almacenamiento local:",
          frontImage
        );
        setImg2(frontImage);
      }
      if (backImage !== null) {
        console.log(
          "Imagen trasera recibida en el almacenamiento local:",
          backImage
        );
        setImg3(backImage);
      }
    } else {
      console.log("Window no está definido");
    }
  }, []);
  const handleNumeroDniChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("Manejando cambio de número de DNI o pasaporte...");
    const inputValue = e.target.value;
    const onlyNumbers = inputValue.replace(/[^0-9]/g, "");
    setNumeroDni(onlyNumbers);
    localStorage.setItem("numeroDni", onlyNumbers); // Guardar en localStorage
  };

  useEffect(() => {
    console.log(
      "Cargando número de DNI o pasaporte desde el almacenamiento local..."
    );
    const storedNumeroDni = localStorage.getItem("numeroDni");
    if (storedNumeroDni) {
      setNumeroDni(storedNumeroDni);
    }
  }, []); // Cargar al inicio del componente

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log("Manejando cambio de tipo de documento...");
    const selectedType = e.target.value.toLowerCase();
    setType(selectedType);
    localStorage.setItem("documentType", selectedType);
  };

  useEffect(() => {
    console.log("Cargando tipo de documento desde el almacenamiento local...");
    const storedType = localStorage.getItem("documentType");
    if (storedType) {
      setType(storedType);
    }
  }, []);

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
                className={`p-4 border rounded-sm cursor-pointer bg-white ${
                  type ? "text-black" : "text-slate-400"
                }`}
                style={{
                  width: "300px",
                }}
                value={type || ""}
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
