import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const IndexPage: React.FC = () => {
  useEffect(() => {
    // Manejar eventos de Socket.IO en el frontend
    socket.on('mensaje', (data) => {
      console.log('Mensaje recibido en el frontend:', data);
      // Actualizar el estado de tu aplicación, mostrar una notificación, etc.
    });

    // Limpiar el evento cuando el componente se desmonta
    return () => {
      socket.disconnect();
    };
  }, []);

  const enviarMensaje = () => {
    // Enviar un mensaje al backend a través de Socket.IO
    socket.emit('mensaje', '¡Hola desde el frontend!');
  };

  console.log(enviarMensaje)

  return (
   
    <div> 
      <h1>hola</h1>
    </div>
   
  );
};

export default IndexPage;

