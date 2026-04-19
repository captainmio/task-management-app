import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  projectId!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  status!: 'backlog' | 'todo' | 'inProgress' | 'review' | 'done';

  @Column()
  userId!: number;
}