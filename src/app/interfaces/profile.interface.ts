import { IUser } from "./user.interface";

export interface IdriverLicense {
  frontPhoto: string;
  backPhoto: string;
}
export interface IIdDocument {
  type: string;
  number: string;
  frontPhoto: string;
  backPhoto: string;
}

export interface IProfile {
  _id: string;
  driverLicense: IdriverLicense;
  idDocument: IIdDocument;
  city: string;
  phoneNumber: string;
}
