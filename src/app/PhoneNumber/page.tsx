"use client";
"use client";
import { LuFolderInput } from "react-icons/lu";
import { ChangeEvent, useRef } from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

require("dotenv").config();

export default function PhoneNumber() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (phoneNumber) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [phoneNumber]);

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
          console.log(ans);
        }
      } catch (error) {
        console.error(error);
      }
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
        phoneNumber,
      }),
    });
  };

  return (
    <div className="m-8">
      <div className="flex flex-col justify-center items-center p-4 gap-y-5 text-l">
        <h1 className="text-3xl font-black text-left">Numero de teléfono</h1>
      </div>
      <div className="flex flex-col justify-center items-center p-4 gap-y-5 text-l">
        <div>
          <input
            type="text"
            placeholder="+54 9 11 1111 1111"
            className="p-4 border rounded-sm cursor-pointer"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
      </div>

      <div>
        <button
          className="bg-pink w-full disabled:opacity-70 text-white font-bold rounded-b-sm p-3"
          disabled={disable}
          onClick={handleBotonPic}
        >
          Cargar datos
        </button>
      </div>
      <div className="flex justify-items-start items-start">
        <p className="my-5 mx-4 px-8 text-gray-600 font-bold text-left">
          Comparte tu teléfono para que el resto de usuarios se puedan poner en
          contacto contigo una vez se confirme el envío.
        </p>
      </div>
    </div>
  );
}
