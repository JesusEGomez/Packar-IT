"use client";
import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Button } from "@/components/ui/button";
import { IoMdArrowRoundBack } from "react-icons/io";

interface MapComponentProps {
  closeModal: (fromSelected: google.maps.LatLngLiteral) => Promise<void>;
  closeMapModal: () => void;
}

function MapComponent(props: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete>();
  const [selectedPos, setSelectedPos] =
    useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    const loadMap = async () => {
      const loader = new Loader({
        apiKey: "AIzaSyC-477d4w6F6kcjAGHycclP_lSF31JG4Oo",
        version: "weekly",
        libraries: ["places"], // Agregar la librería de Places
      });

      const { Map } = await loader.importLibrary("maps");

      // Obtener la geoposición actual
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const userPosition = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            // Configurar opciones del mapa con la geoposición actual
            const mapOptions: google.maps.MapOptions = {
              center: userPosition,
              zoom: 15,
              mapId: "cesar-map",
            };

            // Crear el mapa
            const newMap = new Map(
              mapRef.current as HTMLDivElement,
              mapOptions
            );
            setMap(newMap);

            // Configurar autocompletado
            const autocomplete = new google.maps.places.Autocomplete(
              inputRef.current as HTMLInputElement
            );
            autocomplete.setFields(["formatted_address", "geometry"]);
            autocompleteRef.current = autocomplete;

            // Esperar a que el mapa se cargue completamente antes de ajustar la posición
            await new Promise((resolve) => {
              google.maps.event.addListenerOnce(newMap, "idle", resolve);
            });

            // Ajustar la posición del mapa después de que esté completamente cargado
            newMap.setCenter(userPosition);
          },
          (error) => {
            console.error("Error obteniendo la geoposición:", error);
          }
        );
      } else {
        console.error("El navegador no soporta la geolocalización.");
      }
    };

    loadMap();
  }, []);

  const handleSearch = () => {
    const place = autocompleteRef.current?.getPlace();

    if (place && place.geometry && map) {
      const location = place.geometry.location;
      map.setCenter(location!.toJSON());

      // Colocar un marcador en la posición seleccionada
      const marker = new google.maps.Marker({
        position: location?.toJSON(),
        map,
        title: place.formatted_address,
      });

      // Guardar la posición seleccionada en el estado
      setSelectedPos(location!.toJSON());

      // Llamar a props.closeModal con la última posición seleccionada
      setTimeout(() => {
        const pos = location?.toJSON();
        props.closeModal(pos!);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col">
      <Button onClick={props.closeMapModal} variant={"ghost"}>
        <IoMdArrowRoundBack />
      </Button>
      <div style={{ height: "600px" }} ref={mapRef} />
      <div className="p-2 mx-auto">
        <input
          className="p-2 bg-slate-200 rounded"
          type="text"
          placeholder="Ingrese una dirección"
          ref={inputRef}
        />
        <button
          className="bg-pink rounded mx-4 p-3 text-white text-sm"
          onClick={handleSearch}
        >
          Seleccionar
        </button>
      </div>
    </div>
  );
}

export default MapComponent;
