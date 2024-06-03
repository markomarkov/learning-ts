import { Entity } from 'typeorm';

@Entity()
export class AppEntity {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}