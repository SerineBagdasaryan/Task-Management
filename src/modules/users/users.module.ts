import {Module} from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from "./entity/users.entity";
import {UserRepository} from "./entity/users.repository";
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {JwtModule,} from "@nestjs/jwt";
import {jwtConstants} from "../../common/utils/constants";

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),],
  providers: [UsersService, UserRepository],
  controllers: [UsersController, UsersController],
  exports: [UsersService, UserRepository]
})
export class UsersModule {}