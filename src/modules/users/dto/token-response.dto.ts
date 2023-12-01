import { ApiProperty } from '@nestjs/swagger';
import { DefaultValue } from '@common/utils/default-value';

export class TokenResponseDto {

  @ApiProperty({
    type: String,
    default: DefaultValue.accessToken,
  })
  accessToken: string;
}
