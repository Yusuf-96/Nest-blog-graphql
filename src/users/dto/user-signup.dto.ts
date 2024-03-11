import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignupUserDto {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
