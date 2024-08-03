import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Autobot } from './autobot.entity';
import { Comment } from './comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToOne(() => Autobot, (autobot) => autobot.posts)
  autobot: Autobot;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
