export abstract class BaseId {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Image {
  path: string;
  angle: number;
  url: string;
}
