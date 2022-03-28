import { BaseId } from "./common.model";
import { User } from "./user.model";

export enum AuthenticationType {
  Email = "Email",
  Kakao = "Kakao",
  Apple = "Apple",
}

export class Authentication extends BaseId {
  user: User;
  userId: number;

  type: AuthenticationType;
  code: string;
  email: string;
}
