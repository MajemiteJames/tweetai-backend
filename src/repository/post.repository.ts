import { EntityRepository, Repository } from 'typeorm';
import { Post } from '../entities/post.entity';

@EntityRepository(Post)
export class PostRespository extends Repository<Post> {}
