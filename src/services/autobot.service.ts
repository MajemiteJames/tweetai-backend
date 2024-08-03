import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Autobot } from '../entities/autobot.entity';
import { Post } from '../entities/post.entity';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class AutobotService {
  constructor(
    @InjectRepository(Autobot)
    private autobotRepository: Repository<Autobot>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async createAutobots(): Promise<void> {
    const { data: users } = await axios.get(
      'https://jsonplaceholder.typicode.com/users',
    );
    const { data: posts } = await axios.get(
      'https://jsonplaceholder.typicode.com/posts',
    );
    const { data: comments } = await axios.get(
      'https://jsonplaceholder.typicode.com/comments',
    );

    for (let i = 0; i < 500; i++) {
      const user = users[i % users.length];
      const autobot = this.autobotRepository.create({
        name: user.name,
        username: user.username,
        email: user.email,
      });
      await this.autobotRepository.save(autobot);

      const autobotPosts = posts.slice(i * 10, (i + 1) * 10).map((post) => {
        return this.postRepository.create({
          title: post.title,
          body: post.body,
          autobot: autobot,
        });
      });
      await this.postRepository.save(autobotPosts);

      const autobotComments = autobotPosts.flatMap((post) =>
        comments.slice(i * 10, (i + 1) * 10).map((comment) => {
          return this.commentRepository.create({
            name: comment.name,
            email: comment.email,
            body: comment.body,
            post: post,
          });
        }),
      );
      await this.commentRepository.save(autobotComments);
    }
  }

  async findAutobots(page: number): Promise<Autobot[]> {
    return this.autobotRepository.find({
      skip: (page - 1) * 10,
      take: 10,
    });
  }

  async findAutobotPosts(autobotId: string, page: number): Promise<Post[]> {
    return this.postRepository.find({
      where: { autobot: { id: autobotId } },
      skip: (page - 1) * 10,
      take: 10,
    });
  }

  async findPostComments(postId: string, page: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post: { id: postId } },
      skip: (page - 1) * 10,
      take: 10,
    });
  }
}
