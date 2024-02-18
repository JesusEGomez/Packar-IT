import { IUser } from "./user.interface";

export interface IProductDB {
  _id: string;
  type: string;
  name: string;
  size: string;
  weigth: string;
  photoProduct: string;
  articulosEspeciales: string;
}
export interface IProductEnvio extends IProductDB {
  EnvioInfo: {
    desde: { calle: string | null; pais: string | null; ciudad: string | null };
    hasta: { calle: string | null; pais: string | null; ciudad: string | null };
    _id: string;
    usuario: {
      _id: string;
      email: string;
      fullname: string;
      smsCode: string;
      phoneNumber: string;
    };
    cuando: string | undefined;
    recibe: {
      nombreApellidos: string;
      telefono: string;
      email: string;
    };
    producto: string;
    estado: string;
    driver: string;
  };
}
