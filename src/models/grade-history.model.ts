import { BaseId } from './common.model';
import { User } from './user.model';

export class GradeHistory extends BaseId {
  user: User;
  userId: number;

  year: number;
  grade: number;
}
