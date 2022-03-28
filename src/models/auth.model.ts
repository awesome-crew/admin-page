import { BaseId } from './common.model';
import { User } from './user.model';

export class JwtPayload {
  /** userId */
  sub: number;
  nickname: string;
  expiresIn: Date;
}

export class JwtToken {
  access: string;
  refresh: string;
}

export enum AuthenticationType {
  Email = 'Email',
  Kakao = 'Kakao',
  Apple = 'Apple',
}
export const authenticationType2Kor = (type: AuthenticationType) =>
  ({
    Email: '이메일',
    Kakao: '카카오',
    Apple: '애플',
  }[type]);

export class Authentication extends BaseId {
  user: User;
  userId: number;

  type: AuthenticationType;
  code: string;
  email: string;
}

export enum AppleClientType {
  App = 'App',
  Web = 'Web',
}
