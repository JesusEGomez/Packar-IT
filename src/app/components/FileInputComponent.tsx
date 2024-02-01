'use client'
import React, { ChangeEvent, useRef } from 'react';
import { LuFolderInput } from "react-icons/lu";

const FileInputComponent: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // console.log(file);
  };

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className='flex flex-col justify-center items-center p-4 gap-y-5'>
      <h1 className='text-2xl'>Añade una imagen de tu envío</h1>
      <div className='p-10 border w-fit rounded-xl cursor-pointer' onClick={handleDivClick}>
        <LuFolderInput size={70} />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default FileInputComponent;
