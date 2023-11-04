import { IsNotEmpty, IsOptional } from 'class-validator';

export class ResponseDataPaginationDTO<T> {
  @IsNotEmpty()
  data: T;

  @IsOptional()
  status?: number;

  @IsOptional()
  count?: number;
}
