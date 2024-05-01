import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator"

export class CreateProductDto {
  @MinLength(1)
  @IsString()
  title: string

  @IsPositive()
  @IsOptional()
  @IsNumber()
  price?: number

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  slug?: string

  @IsPositive()
  @IsOptional()
  @IsInt()
  stock?: number

  @IsString({ each: true })
  @IsArray()
  sizes: string[]

  @IsIn(['men', 'woman', 'kids', 'unisex'])
  gender: string

  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  tags?: string[]

  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  images?: string[];
}
