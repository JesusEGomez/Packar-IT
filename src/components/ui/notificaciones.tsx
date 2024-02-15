"use client"
import React from 'react';

const Notificaciones = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {/* Contenedor del globo de notificación */}
      <div className="w-10 h-10 bg-red-500 rounded-full"></div>

      {/* Número en color blanco */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
        <span className="text-xl font-semibold">1</span>
      </div>
    </div>
  );
};

export default Notificaciones;
