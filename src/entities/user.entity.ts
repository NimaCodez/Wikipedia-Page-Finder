import 'reflect-metadata';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  @Column({ unique: true })
  chat_id: number;
  @Column()
  first_name: string;
  @Column({ nullable: true })
  last_name: string;
  @Column({ nullable: true })
  username: string;
  @Column({ nullable: true })
  last_search_timestamp: number;
  @Column({ default: 0 })
  search_count: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
