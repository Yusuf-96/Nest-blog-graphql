import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CommentType } from 'src/comment/type/comment.type';

@ObjectType('Post')
export class PostType {
  @Field(() => ID)
  post_id: string;

  @Field()
  content: string;

  @Field()
  created_at: Date;

  @Field(() => [CommentType])
  comments: CommentType[];

  @Field()
  upvotes: number;

  @Field()
  downvotes: number;
}
