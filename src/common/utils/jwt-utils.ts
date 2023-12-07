import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from '@modules/users/entities/users.entity';

export function verifyToken(token: string, secret: string): User {
  try {
    return jwt.verify(token, secret) as User;
  } catch (error) {
    throw new UnauthorizedException('Invalid token');
  }
}
