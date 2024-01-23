export interface IUserProduct {
  desde: { calle: string | null; pais: string | null; ciudad: string | null };
  hasta: { calle: string | null; pais: string | null; ciudad: string | null };
  _id: string;
  usuario: string;
  cuando: string | undefined;
  especial: boolean;
  recibe: {
    nombreApellidos: string;
    telefono: string;
    email: string;
  };
  producto: {
    name: string;
  };
  estado: string;
  driver: string;
}
