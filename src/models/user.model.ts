import { Authentication } from "./authentication.model";
import { BaseId } from "./common.model";
import { SchoolHistory } from "./school-history.model";

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
