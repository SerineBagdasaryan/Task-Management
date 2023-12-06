import { ApiProperty } from '@nestjs/swagger';
import { DefaultValue } from '@common/utils/default-value';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    type: String,
    default: DefaultValue.accessToken,
    required: true,
  })
  @IsNotEmpty({ message: 'Refresh Token is required' })
  @IsString({ message: 'Refresh Token must be a string' })
  refreshToken: string;
}
