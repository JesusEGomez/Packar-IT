'use client'
import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

function MapComponent() {

  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMap = async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyC-477d4w6F6kcjAGHycclP_lSF31JG4Oo',
        version: 'weekly',
      });

      const { Map } = await loader.importLibrary('maps');

      // Obtener la geoposición actual
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const userPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // Configurar opciones del mapa con la geoposición actual
          const mapOptions: google.maps.MapOptions = {
            center: userPosition,
            zoom: 15,
            mapId: 'cesar-map',
          };

          // Crear el mapa
          const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

          // Esperar a que el mapa se cargue completamente antes de ajustar la posición
          await new Promise((resolve) => {
            google.maps.event.addListenerOnce(map, 'idle', resolve);
          });

          // Ajustar la posición del mapa después de que esté completamente cargado
          map.setCenter(userPosition);
        }, (error) => {
          console.error("Error obteniendo la geoposición:", error);
        });
      } else {
        console.error("El navegador no soporta la geolocalización.");
      }
    }

    loadMap();
  }, [])

  return (
    <div style={{height: '600px'}} ref={mapRef}/>
  )
}

export default MapComponent;
