import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignupUserDto } from './dto/user-signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signup(
    signupUserDto: SignupUserDto,
  ): Promise<{ message: string; statusCode: number }> {
    const email = signupUserDto.email;

    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      throw new Error('Email already exists');
    }

    const salt = await bcrypt.genSalt();

    const password = await bcrypt.hash(signupUserDto.password, salt);

    const newUser = this.userRepository.create({ ...signupUserDto, password });
    await this.userRepository.save(newUser);

    return {
      message: 'User created successfully',
      statusCode: 201,
    };
  }

  async getUser(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}
