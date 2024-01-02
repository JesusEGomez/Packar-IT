"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="page-pink">
      <Link href={"/onboarding"}>
        <Image
          src="/logo.webp"
          width={300}
          height={300}
          className="bg-slate-200 cursor-pointer"
          alt="logo"
        />
      </Link>

      {/* <div>
        <button onClick={() => router.push('/register')} className='bg-pink m-3 p-3 rounded-lg text-white hover:opacity-70'>Resgistrate</button>
        <button onClick={() => router.push('/login')} className='bg-pink m-3 p-3 rounded-lg text-white hover:opacity-70'>Ingresa</button>
      </div> */}
    </div>
  );
}
