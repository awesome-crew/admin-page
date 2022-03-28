import { BaseId } from './common.model';
import { Project } from './project.model';
import { User } from './user.model';

export class Comment extends BaseId {
  user: User;
  userId: number;

  project: Project;
  projectId: number;

  parent: Comment;
  parentId: number;
  replies: Comment[];
  mentionedUser: User;
  mentionedUserId: number;

  content: string;

  likeCount: number;

  isLiking: boolean;
  isMine: boolean;
}
