"use client";

import ProductCard from "@/app/components/ProductCard";
import useUserState from "@/app/store/sotre";
import React, { useEffect, useState } from "react";

interface Envio {
  _id: string;
  usuario: {
    _id: string;
    email: string;
    fullname: string;
  };
  desde: {
    lat: number;
    lng: number;
  };
  hasta: {
    lat: number;
    lng: number;
    coordenadasExtras: string[];
  };
  cuando: Date;
  producto: {
    name: string;
  };
}

const Envios: React.FC = () => {
  const { products, fetchUserProducts, user } = useUserState((state) => state);

  useEffect(() => {
    !products.length && fetchUserProducts(user._id);
  }, []);
  console.log(products);

  return (
    <div className="w-full flex  flex-col overflow-auto gap-2 justify-center items-center">
      {products.length ? (
        products.map((product) => {
          return (
            <ProductCard
              key={product._id}
              cuando={product.cuando!}
              desde={product.desde}
              // estado={product.estado}
              hasta={product.hasta}
              _id={product._id}
              producto={product.producto}
            />
          );
        })
      ) : (
        <div>No Tienes viajes</div>
      )}
    </div>
  );
};

export default Envios;
