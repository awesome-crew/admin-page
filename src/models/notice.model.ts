import { BaseId } from './common.model';

export type NoticeType = 'General' | 'Faq';

export class Notice extends BaseId {
  type: NoticeType;
  title: string;
  description: string;
}
