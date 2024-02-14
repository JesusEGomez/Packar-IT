"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HomePage = ({ socket }: any) => {
  console.log("Socket in HomePage:", socket);
  const navigate = useRouter();
  return (
    <div className="page-pink items-center ">
      <div className="flex flex-col items-center gap-y-4">
        {" "}
        <Image
          src="/logo.png"
          width={300}
          height={300}
          className=" cursor-pointer"
          alt="logo"
        />
        <Button
          onClick={() => navigate.push("/onboarding")}
          className=" ml-10 w-20 font-bold h-8 bg-white text-pink"
        >
          Acceder
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
