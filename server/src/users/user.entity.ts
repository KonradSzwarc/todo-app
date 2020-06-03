import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Task } from '../tasks/task.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum Language {
  EN = 'en',
  PL = 'pl',
}

export enum ThemeKey {
  LIGHT = 'light',
  DARK = 'dark',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: Language,
    default: Language.EN,
  })
  @ApiProperty({ enum: Language, enumName: 'Language', default: Language.EN })
  language: Language;

  @Column({
    type: 'enum',
    enum: ThemeKey,
    default: ThemeKey.LIGHT,
  })
  @ApiProperty({ enum: ThemeKey, enumName: 'ThemeKey', default: ThemeKey.LIGHT })
  theme: ThemeKey;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
