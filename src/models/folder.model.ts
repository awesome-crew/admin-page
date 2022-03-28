import { Category } from './category.model';
import { BaseId } from './common.model';
import { User } from './user.model';

export class Folder extends BaseId {
  category: Category;
  categoryId: number;
  parent: Folder;
  parentId: number;
  user: User;
  userId: number;

  color: string;
  name: string;
  startDate: string;
  endDate: string;
  timestampOffset: number;

  static isDefault(folder: Folder): boolean {
    return folder.categoryId === 1 && folder.name === '기본';
  }
}
