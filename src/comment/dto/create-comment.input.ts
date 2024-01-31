import { InputType, Int, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @MinLength(3)
  @Field()
  content: string;

  @Field(() => String)
  post_id: string;
}
