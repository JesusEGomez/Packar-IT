"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="page-pink items-center">
      <Link href={"/onboarding"}>
        <Image
          src="/logo.webp"
          width={300}
          height={300}
          className="bg-slate-200 cursor-pointer"
          alt="logo"
        />
      </Link>
    </div>
  );
}
