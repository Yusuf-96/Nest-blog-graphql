import { InputType, Int, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreatePostInput {
  @MinLength(3)
  @Field()
  content: string;
}
