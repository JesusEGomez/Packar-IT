import { useState, useEffect } from "react";
import { sendNotification } from "../api/ably/Notifications";

interface Location {
  latitude: number;
  longitude: number;
}

const useLocationNotification = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [recipientUserId, setRecipientUserId] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude });
              console.log("Ubicación actualizada:", { latitude, longitude });
            },
            (error) => {
              console.error("Error al obtener la ubicación:", error.message);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } 
          );
        } else {
          console.error("La geolocalización no es compatible con este navegador");
        }
      };

    const locationInterval = setInterval(() => {
      getLocation();
      console.log("Ubicación actualiza");
    }, 50000);

    return () => {
      clearInterval(locationInterval);
      console.log("Temporizador limpiado");
    };
  }, []);

  const sendLocationNotification = () => {
    // Enviar la notificación con la ubicación
    if (location && recipientUserId) {
      const content = `Mensaje con Ubicación: ${location.latitude}, ${location.longitude}`;
      
      console.log("Notificación enviada:", content);
    } else {
      console.error("No se pudo obtener la ubicación o el ID del destinatario.");
    }
  };

  return {
    sendLocationNotification,
  };
};

export default useLocationNotification;
