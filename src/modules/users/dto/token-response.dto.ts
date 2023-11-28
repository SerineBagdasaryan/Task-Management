import { ApiProperty } from '@nestjs/swagger';
import { DefaultValue } from '@/common/utils/default-value';

export class TokenResponseDto {
  @ApiProperty({
    type: Number,
    default: DefaultValue.id,
  })
  id: number;

  @ApiProperty({
    type: String,
    default: DefaultValue.accessToken,
  })
  accessToken: string;
}
