export interface ITravelDB {
  desde: { calle: string | null; pais: string | null; ciudad: string | null };
  hasta: { calle: string | null; pais: string | null; ciudad: string | null };
  _id: string;
  usuario: string;
  precio: [
    { quantity: number | null; price: number | null; _id: string | null },
    { quantity: number | null; price: number | null; _id: string | null },
    { quantity: number | null; price: number | null; _id: string | null }
  ];
  horaSalida: string | null;
  horaLlegada: string | null;
  cuando: string | undefined;
  eresFlexible: boolean;
  estado: boolean;
  envios: [];
  especial: boolean;
}
