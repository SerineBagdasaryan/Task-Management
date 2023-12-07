// jwt-utils.ts

import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ERROR_MESSAGES } from '@common/messages';
import { User } from '@modules/users/entities/users.entity';

export function verifyAccessToken(token: string, secret: string): User {
  try {
    return jwt.verify(token, secret) as User;
  } catch (error) {
    throw new UnauthorizedException(ERROR_MESSAGES.INVALID_ACCESS_TOKEN);
  }
}

export function verifyRefreshToken(token: string, secret: string): User {
  try {
    return jwt.verify(token, secret) as User;
  } catch (error) {
    throw new UnauthorizedException(ERROR_MESSAGES.INVALID_REFRESH_TOKEN);
  }
}
