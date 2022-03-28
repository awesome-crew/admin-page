import { BaseId } from './common.model';
import { User } from './user.model';

export enum NotificationOptionGroup {
  Content = 'Content',
  Follow = 'Follow',
}

export enum NotificationOptionType {
  LikeComment = 'LikeComment',
  LikeProject = 'LikeProject',
  CommentOnMyProject = 'CommentOnMyProject',
  CommentOnProjectWithMyComment = 'CommentOnProjectWithMyComment',
  CreateFollowingsProject = 'CreateFollowingsProject',
  ReplyOnMyComment = 'ReplyOnMyComment',
  Follow = 'Follow',
}

export class NotificationOption extends BaseId {
  type: NotificationOptionType;
  group: NotificationOptionGroup;

  name: string;
  defaultValue: boolean;

  order: number;
}

export class NotificationConfiguration extends BaseId {
  user: User;
  userId: number;
  option: NotificationOption;
  optionId: number;

  value: boolean;
}

export enum NotificationAction {
  LikeComment = 'LikeComment',
  LikeProject = 'LikeProject',
  CommentOnMyProject = 'CommentOnMyProject',
  CommentOnProjectWithMyComment = 'CommentOnProjectWithMyComment',
  CreateFollowingsProject = 'CreateFollowingsProject',
  ReplyOnMyComment = 'ReplyOnMyComment',
  // 팔로잉하지않는 유저가 팔로우하는경우
  FollowByNotFollowingUser = 'FollowByNotFollowingUser',
  // 팔로잉하는 유저가 팔로우하는경우
  FollowByFollowingUser = 'FollowByFollowingUser',
}

export enum NotificationTargetType {
  Project = 'Project',
  User = 'User',
}

export class Notification extends BaseId {
  users: User[];

  sender: User;
  senderId: number;

  action: NotificationAction;

  targetType: NotificationTargetType;
  targetId: number;
  targetContent: string;
}
