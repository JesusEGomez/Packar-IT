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

    const results = data.results[0];
    console.log(results);
    // if (results && results.length > 0) {
    //   const addressComponents = results[0].address_components;
    //   const city = addressComponents.find((component) =>
    //     component.types.includes("locality")
    //   )?.long_name;
    //   const street = addressComponents.find((component) =>
    //     component.types.includes("route")
    //   )?.long_name;
    //   const country = addressComponents.find((component) =>
    //     component.types.includes("country")
    //   )?.long_name;
    //   return `${street}, ${city}, ${country}`;
    // } else {
    //   return "No se encontró ninguna dirección para la geoposición proporcionada.";
    // }
    return results;
  } catch (error) {
    console.error("Error al obtener la dirección:", error);
    return "Error al obtener la dirección.";
  }
};
