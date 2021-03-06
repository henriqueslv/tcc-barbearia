import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import uploadConfig from '../../../../../config/upload';
import { Exclude, Expose } from 'class-transformer';
import upload from '../../../../../config/upload';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatar_url(): string | null {
    process.env.APP_API_URL = 'http://localhost:3333';
    if (!this.avatar) return null;
    return `${process.env.APP_API_URL}/files/${this.avatar}`;
  }

}

export default User;
