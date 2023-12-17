import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { TokenResponseDto } from '@modules/users/dto/token-response.dto';
import { verifyAccessToken, verifyRefreshToken } from '@common/utils/jwt-utils';
import { ERROR_MESSAGES } from '@common/messages';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly _configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly _cacheManager: Cache,
  ) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      this._throwUnauthorized(ERROR_MESSAGES.MISSING_TOKEN.message);
    }

    try {
      const accessTokenSecret = this._configService.get('JWT_ACCESS_SECRET');
      const decodedAccessToken = verifyAccessToken(token, accessTokenSecret);
      const storedTokens: TokenResponseDto = await this._cacheManager.get(
        String(decodedAccessToken['id']),
      );
      const refreshTokenSecret = this._configService.get('JWT_REFRESH_SECRET');
      const decodedRefreshToken = verifyRefreshToken(
        storedTokens.refreshToken,
        refreshTokenSecret,
      );

      if (
        !storedTokens ||
        storedTokens.accessToken !== token ||
        !decodedRefreshToken
      ) {
        this._throwUnauthorized('Invalid token');
      }
      req['user'] = decodedAccessToken;
      next();
    } catch (error) {
      this._throwUnauthorized(error.message);
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
