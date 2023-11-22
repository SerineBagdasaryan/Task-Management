import {Inject, Injectable, NestMiddleware, UnauthorizedException} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly _configService: ConfigService,
        @Inject(CACHE_MANAGER) private readonly _cacheManager: Cache
    ) {}

    async use(req: Request, _res: Response, next: NextFunction) {
        const token = this.extractTokenFromHeader(req);

        if (!token) {
            this._throwUnauthorized('Missing token');
        }

        try {
            const secret = this._configService.get('SECRET');
            const decodedToken = jwt.verify(token, secret);
            const storedToken = await this._cacheManager.get(String(decodedToken['id']));

            if (!storedToken || storedToken !== token) {
                this._throwUnauthorized('Invalid token');
            }
            req['user'] = decodedToken;
            next();
        } catch (error) {
            this._throwUnauthorized('Invalid token');
        }
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private _throwUnauthorized(message: string): never {
        throw new UnauthorizedException(message);
    }
}

