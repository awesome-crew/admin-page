import { BaseId } from './common.model';
import { School } from './school.model';
import { User } from './user.model';

export class SchoolHistory extends BaseId {
  user: User;
  userId: number;
  school: School;
  schoolId: number;

  startYear: number;
  endYear: number;

  isAttending: boolean;
}
