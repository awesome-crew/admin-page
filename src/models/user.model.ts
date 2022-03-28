import { Authentication } from './auth.model';
import { BaseId } from './common.model';
import { SchoolHistory } from './school-history.model';

export enum UserOauthType {
  Kakao = 'Kakao',
  Apple = 'Apple',
}

export class User extends BaseId {
  schoolHistories: SchoolHistory[];

  authentications: Authentication[];

  nickname: string;
  dreamJob: string;
  description: string;
  avatarUrl: string;

  followCount: number;
  followerCount: number;
  postCount: number;
  commentCount: number;
  likeCount: number;

  isPublic: boolean;
  isMento: boolean;

  isMe: boolean;
  isFollowing: boolean;
}
