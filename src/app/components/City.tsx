"use client";
import { LuFolderInput } from "react-icons/lu";

import { useState, useEffect, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { IoMdArrowRoundBack } from "react-icons/io";

require("dotenv").config();

export default function City(props: any) {
  const [city, setCity] = useState("");
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (city) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [city]);

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
        city,
      }),
    });
    props.closeCityModal();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full my-auto mt-4">
      <Button onClick={props.closeCityModal} variant={"ghost"}>
        <IoMdArrowRoundBack />
      </Button>
      <div className="flex flex-col justify-center items-center p-4 gap-y-5 text-l">
        <h1 className="text-3xl font-black  text-left">
          ¿En que ciudad vives?
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center p-4 gap-y-5 text-l">
        <div>
          <input
            type="text"
            placeholder="Añadir ciudad"
            className="p-4 border rounded-sm cursor-pointer"
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
          className="bg-pink w-full disabled:opacity-70 text-white font-bold rounded-b-xl p-3"
          disabled={disable}
          onClick={handleBotonPic}
        >
          Cargar datos
        </button>
      </div>
    </div>
  );
}
