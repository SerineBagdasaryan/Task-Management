import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersService} from "../users/users.service";
import {UsersModule} from "../users/users.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UsersModule]
})
export class AuthModule {}
