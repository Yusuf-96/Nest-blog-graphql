import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignupUserDto } from 'src/users/dto/user-signup.dto';
import { UsersService } from 'src/users/users.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => String)
  async signup(@Args('singupUserDto') singupUserDto: SignupUserDto) {
    const signupUser = await this.usersService.signup(singupUserDto);

    const { message, statusCode } = signupUser;

    return message;
  }
}
