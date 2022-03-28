import { Category } from './category.model';
import { BaseId, Image } from './common.model';
import { Folder } from './folder.model';
import { Tag } from './tag.model';
import { User } from './user.model';

export class ProjectImage extends Image {
  project: Project;
  projectId: number;
  order: number;
}

export class Project extends BaseId {
  category: Category;
  categoryId: number;
  parent: Folder;
  parentId: number;
  user: User;
  userId: number;
  tags: Tag[];

  images: ProjectImage[];

  color: string;
  name: string;
  startDate: string;
  endDate: string;
  timestampOffset: number;

  content: string;
  location: string;

  likeCount: number;
  bookmarkCount: number;
  isPublic: boolean;

  // dynamic fields
  isLiking: boolean;
  isBookmarking: boolean;
  isMine: boolean;
}
