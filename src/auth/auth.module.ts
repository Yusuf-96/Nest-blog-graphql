import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthResolver, AuthService, LocalStrategy],
})
export class AuthModule {}
