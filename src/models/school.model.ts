export enum SchoolType {
  Elementary = 'Elementary',
  Middle = 'Middle',
  High = 'High',
}

export class School {
  id: number;
  gsCode: string;

  type: SchoolType;
  name: string;
  address: string;
  oldAddress: string;
}
