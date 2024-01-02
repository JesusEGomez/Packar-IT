export const getFormattedAddress = async (location: any) => {
    const apiKey = 'AIzaSyC-477d4w6F6kcjAGHycclP_lSF31JG4Oo'; // Reemplaza con tu clave de API de Google Maps
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      const results = data.results;
  
      if (results && results.length > 0) {
        const formattedAddress = results[0].formatted_address;
        return formattedAddress;
      } else {
        return 'No se encontró ninguna dirección para la geoposición proporcionada.';
      }
    } catch (error) {
      console.error('Error al obtener la dirección:', error);
      return 'Error al obtener la dirección.';
    }
  };