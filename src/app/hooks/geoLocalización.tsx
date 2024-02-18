import { useState, useEffect } from "react";


interface BaseLocation {
  latitude: number;
  longitude: number;
}

interface ExtendedLocation extends BaseLocation {
  address?: string;
  city?: string;
  country?: string;
  province?: string;
  timestamp: number;
}

const useLocationNotification = () => {
  const [location, setLocation] = useState<ExtendedLocation | null>(null);
  const [recipientUserId, setRecipientUserId] = useState<string | null>(null);
  const [locationHistory, setLocationHistory] = useState<ExtendedLocation[]>(
    []
  );

  const LOCATION_UPDATE_INTERVAL = 50000;

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              );
              const data = await response.json();
              //console.log(data);
              setLocation({
                latitude,
                longitude,
                timestamp: Date.now(),
                address: data?.localityInfo?.administrative[2]?.name,
                city: data?.localityInfo?.administrative[1]?.name,
                province: data?.localityInfo?.administrative[0]?.name,
                country: data?.countryName,
              }); 
              setLocationHistory([
                ...locationHistory,
                {
                  latitude,
                  longitude,
                  timestamp: Date.now(),
                },
              ]);
            } catch (error) {
              console.error(error);
            }
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        console.error("Geolocalización no soportada");
      }
    };

    const locationInterval = setInterval(getLocation, LOCATION_UPDATE_INTERVAL);

    return () => clearInterval(locationInterval);
  }, []);

  const sendLocationNotification = () => {
    // Enviar la notificación con la ubicación
    if (location && recipientUserId) {
      const content = `Mensaje con Ubicación: ${location.latitude}, ${location.longitude}`;
      const locationInfo = `Ciudad: ${location.city}, Provincia: ${location.province}, País: ${location.country}`;
      //console.log("Notificación enviada:", content);
      //console.log("Información de ubicación:", locationInfo);
    } else {
      console.error(
        "No se pudo obtener la ubicación o el ID del destinatario."
      );
    }
  };

  return {
    location,
    locationHistory,
    recipientUserId,
    sendLocationNotification,
  };
};

export default useLocationNotification;
