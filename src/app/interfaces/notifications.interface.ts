import { IProductDB } from "./productDB.interface";
import { IUser } from "./user.interface";

export interface INotification {
  type?: string;
  estado?: "Pendiente" | "Aceptado" | "Rechazado";
  visto?: boolean;
  usuario?: string;
  desde?: {
    calle?: string;
    pais?: string;
    ciudad?: string;
  };
  hasta?: {
    calle?: string;
    pais?: string;
    ciudad?: string;
  };
  cuando?: Date;
  producto?: IProductDB;
  recibe?: {
    nombreApellidos?: string;
    telefono?: string;
    email?: string;
  };
  driver?: {
    _id?: string;
    usuario?: IUser;
    desde?: {
      pais?: string;
      ciudad?: string;
      calle?: string;
    };
    hasta?: {
      pais?: string;
      ciudad?: string;
      calle?: string;
    };
    cuando?: string;
    horaSalida?: string;
    horaLlegada?: string;
    eresFlexible?: boolean;
    estado?: string;
    precio?: object[];
    envios?: Array<any>[];
    special?: boolean;
    como?: string;
  };
}
