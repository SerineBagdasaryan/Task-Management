import { IsNotEmpty, IsOptional } from 'class-validator';

export class ResponseDataDTO<T> {
  @IsNotEmpty()
  data: T;

  @IsOptional()
  status?: number;
}
