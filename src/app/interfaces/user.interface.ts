import { IProfile } from "./profile.interface";

export interface IUser {
  _id: string;
  email: string;
  fullname: string;
  profile: IProfile;
}
