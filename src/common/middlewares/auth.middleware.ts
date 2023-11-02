import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly _configService: ConfigService) {}
    use(req: Request, _res: Response, next: NextFunction) {
        const token = this.extractTokenFromHeader(req);

        if (!token) {
            throw new UnauthorizedException('Missing token');
        }

        try {
            const decodedToken = jwt.verify(token, this._configService.get('SECRET'));
            req['user'] = decodedToken;
            next();
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
