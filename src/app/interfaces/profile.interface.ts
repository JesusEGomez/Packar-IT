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
  userId: IUser;
  driverLicense: IdriverLicense;
  idDocument: IIdDocument;
  customerId: string | null;
  city: string;
  phoneNumber: string;
  account: {
    state: string;
    number: string;
  }

}
