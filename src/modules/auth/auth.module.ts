import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [UsersModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('SECRET'),
                signOptions: { expiresIn: configService.get<string>('EXP')},
                global: true,
            }),
            inject: [ConfigService],
        }),
    ]
})
export class AuthModule {
}
