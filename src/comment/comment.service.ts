import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Post } from 'src/posts/entities/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createCommentInput: CreateCommentInput): Promise<Comment> {
    const { content, post_id } = createCommentInput;

    const post = await this.postRepository.findOneBy({ post_id });
    if (!post) {
      throw new NotFoundException(`Post with id ${post_id} not found`);
    }

    const comment = this.commentRepository.create({
      comment_id: uuid(),
      content,
      post: { post_id },
    });

    return this.commentRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({ relations: ['post'] });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} comment`;
  // }

  // update(id: number, updateCommentInput: UpdateCommentInput) {
  //   return `This action updates a #${id} comment`;
  // }

  async remove(coment_id: string): Promise<string> {
    const comment = await this.commentRepository.findOneBy({
      comment_id: coment_id,
    });

    if (!comment) {
      throw new NotFoundException(`Comment with id ${coment_id} not found`);
    }

    await this.commentRepository.remove(comment);

    return `This action removes a #${coment_id} comment`;
  }
}
