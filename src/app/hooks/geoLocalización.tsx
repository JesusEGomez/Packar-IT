import { useState, useEffect } from "react";
import { sendNotification } from "../api/ably/Notifications";

interface BaseLocation {
  latitude: number;
  longitude: number;
}

interface ExtendedLocation extends BaseLocation {
  address?: string;
  city?: string;
  country?: string;
  province?: string;
}

const useLocationNotification = () => {
  const [location, setLocation] = useState<ExtendedLocation | null>(null);
  const [recipientUserId, setRecipientUserId] = useState<string | null>(null);
  const [routes, setRoutes] = useState<BaseLocation[]>([]);

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            if (latitude !== undefined && longitude !== undefined) {
              try {
                const response = await fetch(
                  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                );
                const data = await response.json();
                console.log("Data Recibida:", data);
                setLocation({
                  latitude,
                  longitude,
                  address: data.localityInfo.administrative[2].name,
                  city: data.localityInfo.administrative[1].name,
                  province: data.localityInfo.administrative[0].name,
                  country: data.countryName,
                });
              } catch (error) {
                console.error(
                  "Error al obtener la información de la ubicación:",
                  error
                );
              }
            } else {
              console.error("La latitud y la longitud no están definidas.");
            }
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
    }, 60000);

    return () => {
      clearInterval(locationInterval);
      console.log("Temporizador limpiado");
    };
  }, []);

  const sendLocationNotification = () => {
    if (location && recipientUserId) {
      const content = `Mensaje con Ubicación: ${location.latitude}, ${location.longitude}`;
      const locationInfo = `Ciudad: ${location.city}, Provincia: ${location.province}, País: ${location.country}`;
      console.log("Notificación enviada:", content);
      console.log("Información de ubicación:", locationInfo);

      // Envía la notificación y las rutas al backend
      fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: recipientUserId,
          notifications: [{ message: content }],
          routes: routes, 
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Perfil actualizado:", data))
        .catch((error) => console.error("Error al actualizar el perfil:", error));
    } else {
      console.error("No se pudo obtener la ubicación o el ID del destinatario.");
    }
  };

  return {
    sendLocationNotification,
    setRoutes
  };
};

export default useLocationNotification;
