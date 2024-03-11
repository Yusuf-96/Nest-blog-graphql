import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './type/user.type';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserType, { name: 'user' })
  async getuser(@Args('email') email: string) {
    return this.usersService.getUser(email);
  }
}
