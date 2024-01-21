export interface IUserProduct {
  desde: { calle: string | null; pais: string | null; ciudad: string | null };
  hasta: { calle: string | null; pais: string | null; ciudad: string | null };
  _id: string;
  usuario: string;
  cuando: string | undefined;
  envios: [];
  especial: boolean;
  recibe: {
    nombreApellido: string;
    telefono: string;
    email: string;
  };
  producto: {
    name: string;
  };
}
