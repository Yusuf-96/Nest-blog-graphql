import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Users')
export class UserType {
  @Field()
  userId: string;

  @Field()
  username: string;

  @Field()
  email: string;
}
