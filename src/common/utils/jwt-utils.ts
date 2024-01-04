import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ERROR_MESSAGES } from '@common/messages';
import { User } from '@modules/users/entities/users.entity';
import { Token } from '@common/enums';

export function verifyToken(
  token: string,
  secret: string,
  tokenType: string,
): User {
  try {
    return jwt.verify(token, secret) as User;
  } catch (error) {
    if (tokenType === Token.access) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_ACCESS_TOKEN);
    }
    throw new UnauthorizedException(ERROR_MESSAGES.INVALID_REFRESH_TOKEN);
  }
}
