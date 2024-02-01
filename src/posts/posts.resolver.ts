import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PostType } from './type/post.type';

@Resolver(() => PostType)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => PostType)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  @Query(() => [PostType], { name: 'posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Query(() => PostType, { name: 'post' })
  findOne(@Args('post_id', { type: () => String }) post_id: string) {
    return this.postsService.findOne(post_id);
  }

  @Mutation(() => PostType)
  updatePost(
    @Args('post_id') post_id: string,
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ) {
    return this.postsService.update(post_id, updatePostInput);
  }

  @Mutation(() => String)
  async upvotePost(@Args('post_id') post_id: string) {
    const post = await this.postsService.upvotePost(post_id);

    return post.message;
  }

  @Mutation(() => String)
  async downvotePost(@Args('post_id') post_id: string) {
    const post = await this.postsService.downvotePost(post_id);

    return post.message;
  }

  // @Mutation(() => Post)
  // removePost(@Args('id', { type: () => Int }) id: number) {
  //   return this.postsService.remove(id);
  // }
}
