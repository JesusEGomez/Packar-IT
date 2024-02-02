type myLocation = {
  lat: number;
  lng: number;
};

export const getFormattedAddress = async (location: myLocation) => {
  const apiKey = "AIzaSyC-477d4w6F6kcjAGHycclP_lSF31JG4Oo"; // Reemplaza con tu clave de API de Google Maps
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    const number = data.results[0].address_components[0].long_name;
    const street = data.results[0].address_components[1].long_name;
    const city = data.results[0].address_components[2].long_name;
    const formatted_address = data.results[0].formatted_address.split(",");
    const country = formatted_address[formatted_address.length - 1].trim();
    const results = `${number} ${street}, ${city}, ${country}`;
    if (results) {
      console.log(results);
      return results;
    } else {
      return "No se encontró ninguna dirección para la geoposición proporcionada.";
    }
  } catch (error) {
    console.error("Error al obtener la dirección:", error);
    return "Error al obtener la dirección.";
  }
};
