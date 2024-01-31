import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { CommentType } from './type/comment.type';

@Resolver(() => CommentType)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => CommentType)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return this.commentService.create(createCommentInput);
  }

  @Query(() => [CommentType], { name: 'comments' })
  findAll() {
    return this.commentService.findAll();
  }

  // @Query(() => Comment, { name: 'comment' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.commentService.findOne(id);
  // }

  // @Mutation(() => Comment)
  // updateComment(@Args('updateCommentInput') updateCommentInput: UpdateCommentInput) {
  //   return this.commentService.update(updateCommentInput.id, updateCommentInput);
  // }

  // @Mutation(() => Comment)
  // removeComment(@Args('id', { type: () => Int }) id: number) {
  //   return this.commentService.remove(id);
  // }
}
