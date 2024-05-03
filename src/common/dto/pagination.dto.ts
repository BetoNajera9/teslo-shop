import { IsPositive, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    description: 'Number of rows do you need',
    default: 10,
  })
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  limit?: number;

  @ApiProperty({
    description: 'Number of rows do you need to skip',
    default: 0,
  })
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  offset?: number;
}
