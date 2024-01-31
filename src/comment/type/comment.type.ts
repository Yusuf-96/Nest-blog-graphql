import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PostType } from 'src/posts/type/post.type';

@ObjectType('Comment')
export class CommentType {
  @Field(() => ID)
  comment_id: string;

  @Field()
  content: string;

  @Field(() => PostType)
  post: PostType;
}
