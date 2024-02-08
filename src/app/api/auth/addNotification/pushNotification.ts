
export const pushNotification = (estado:string) => {
    if(Notification.permission === 'granted'){
        switch (estado) {
            case 'Pendiente':
                new Notification('Nueva solicitud de envío', {
                    body: 'Tienes una nueva solicitud de envío, no pierdas la oportunidad de sacarle provecho a tus viajes'
                });
                break;
            case 'Aceptado':
                new Notification('Tu solicitud ha sido aceptada', {
                    body: 'Se ha actualizado el estado de tu pedido'
                });
                break;
            case 'Rechazado':
                new Notification('Tu solicitud ha sido rechazada', {
                    body: 'Tu solicitud fue rechada, vamos a buscar a otro viajero para llevar tu pedido'
                });
                break;
            default:
                console.error('Estado no reconocido:', estado);
        }        
    }
}