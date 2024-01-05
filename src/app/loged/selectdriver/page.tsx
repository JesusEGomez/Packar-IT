'use client'
import React, { useEffect, useState } from 'react'

function page() {
  const [viajes, setViajes] = useState<[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/auth/viajes');
      const data = await response.json();
      setViajes(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <div></div>
      <h1>Solicita tu envío a un viajero</h1>
      {viajes &&
        viajes.map((viaje: any) => (
          <div key={viaje.id}>
            <h1>{viaje.nombre}</h1>
            <p>{viaje.descripcion}</p>
          </div>
        ))}
    </div>
  )
}

export default page