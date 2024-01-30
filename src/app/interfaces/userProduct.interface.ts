import { ITravelDB } from "./TravelDB.interface";
import { IProductDB } from "./productDB.interface";
import { IProfile } from "./profile.interface";
import { IUser } from "./user.interface";

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
  producto: IProductDB;
  estado: string;
  driver: string;
  findedDriver: ITravelDB;
}
export interface IUserProductFull extends IUserProduct {
  driverFinded: ITravelDB;
  driverProfile: IProfile;
  driverUser: IUser;
}
