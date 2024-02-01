import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async create(createPostInput: CreatePostInput): Promise<Post> {
    const { content } = createPostInput;
    const post = this.postRepository.create({ post_id: uuid(), content });
    return this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['comments'] });
  }

  async findOne(post_id: string): Promise<Post> {
    try {
      const post = await this.postRepository.findOne({
        where: { post_id: post_id },
        relations: ['comments'],
      });
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      return post;
    } catch (error) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }

  async update(
    post_id: string,
    updatePostInput: UpdatePostInput,
  ): Promise<Post> {
    const post = await this.postRepository.findOneBy({ post_id });

    if (!post) {
      throw new NotFoundException(`Post with id ${post_id} not found`);
    }
    post.content = updatePostInput.content;

    return this.postRepository.save(post);
  }

  async upvotePost(post_id: string): Promise<{ message: string }> {
    try {
      const post = await this.postRepository.findOneBy({ post_id });

      if (!post) {
        throw new NotFoundException(`Post with id ${post_id} not found`);
      }

      post.upvotes += 1;
      await this.postRepository.save(post);

      return { message: 'Post upvoted successfully' };
    } catch (error) {
      throw new Error(`Failed Upvote the post: ${error.message}`);
    }
  }

  async downvotePost(post_id: string): Promise<{ message: string }> {
    try {
      const post = await this.postRepository.findOneBy({ post_id });

      if (!post) {
        throw new NotFoundException(`Post with id ${post_id} not found`);
      }

      post.downvotes += 1;
      await this.postRepository.save(post);

      return { message: 'Post downvoted successfully' };
    } catch (error) {
      throw new Error(`Failed DownVote the post: ${error.message}`);
    }
  }

  // remove(id: number) {
  //   return `This action removes a #${id} post`;
  // }
}
