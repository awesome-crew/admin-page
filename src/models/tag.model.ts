import { BaseId } from './common.model';
import { Project } from './project.model';
import { User } from './user.model';

export class Tag extends BaseId {
  projects: Project[];
  users: User[];

  name: string;
  isDefault: boolean;
  isBase: boolean;

  projectCount: number;
  userCount: number;
}
