import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Gender } from '../enums/gender.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column('varchar', { length: 50, nullable: false, unique: true })
  login: string;

  @Column('varchar', { name: 'first_name', length: 100, nullable: false })
  firstName: string;

  @Column('varchar', { name: 'middle_name', length: 100, nullable: true })
  middleName?: string | null;

  @Column('varchar', { name: 'last_name', length: 100, nullable: false })
  lastName: string;

  @Column('varchar', { length: 20, nullable: false })
  gender: Gender;

  @Column('date', { name: 'birth_date', nullable: false })
  birthDate: string;

  @Column('varchar', { length: 50, nullable: true, unique: true })
  phone?: string | null;

  @Column('varchar', { length: 255, nullable: false, unique: true })
  email: string;

  @Column('varchar', { nullable: true, length: 255 })
  avatar?: string | null;

  @Column('boolean', { name: 'is_active', default: false, nullable: false })
  isActive: boolean;
}
