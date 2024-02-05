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
            console.error("Error al obtener la ubicación:", error);
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 } // Configuración adicional
        );
      }
    };

    const fetchRecipientUserId = async () => {
      try {
        const response = await fetch("/api/recipientUserId");
        const data = await response.json();
        setRecipientUserId(data.recipientUserId);
        console.log("ID del destinatario actualizado:", data.recipientUserId);
      } catch (error) {
        console.error("Error al obtener el ID del destinatario:", error);
      }
    };

    getLocation();
    fetchRecipientUserId();

    const locationInterval = setInterval(() => {
      getLocation();
      console.log("Ubicación actualizada en intervalo:", location);
    }, 240000);

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
