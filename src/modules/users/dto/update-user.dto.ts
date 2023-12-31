import { PartialType, PickType } from '@nestjs/swagger';
import { CreateUserDto } from '@modules/users/dto/user.dto';

export class UpdateUserDto extends PartialType(
  PickType(CreateUserDto, ['email', 'firstName', 'lastName'] as const),
) {}
