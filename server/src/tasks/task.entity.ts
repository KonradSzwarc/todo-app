import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  TODO = 'TODO',
  DONE = 'DONE',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  @ApiProperty({ enum: TaskStatus, enumName: 'TaskStatus', default: TaskStatus.TODO })
  status: TaskStatus;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @Column()
  userId: string;
}
