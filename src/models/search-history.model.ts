import { Tag } from './tag.model';
import { User } from './user.model';

export class SearchHistory {
  id: number;
  createdAt: Date;

  user: User;
  userId: number;

  tag: Tag;
  tagId: number;
  portfolio: User;
  portfolioId: number;
}
