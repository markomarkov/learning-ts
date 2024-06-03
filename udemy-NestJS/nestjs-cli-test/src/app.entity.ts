import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AppEntity {
    @PrimaryGeneratedColumn('uuid') 
    // is a decorator that tells TypeORM to generate a primary key column in the database.
    id: string;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;
}