import { IsPositive, IsOptional, Min } from "class-validator"
import { Type } from "class-transformer"

export class PaginationDto {
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  limit?: number

  @Type(() => Number)
  @IsOptional()
  @Min(0)
  offset?: number
}