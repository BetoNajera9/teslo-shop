import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsPositive,
  MinLength,
  IsNumber,
  IsString,
  IsArray,
  IsIn,
  IsInt,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Men’s Chill Crew Neck Sweatshirt',
    description: 'Name of the product',
    nullable: false,
    minLength: 1,
  })
  @MinLength(1)
  @IsString()
  title: string;

  @ApiProperty({
    example: 75.5,
    description: 'Price of the product',
    nullable: true,
  })
  @IsPositive()
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    example:
      'Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.',
    description: 'Description of the products',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'mens_chill_crew_neck_sweatshirt',
    description: 'slug product',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({
    example: 7,
    description: 'Number of products in stock',
    nullable: true,
  })
  @IsPositive()
  @IsOptional()
  @IsInt()
  stock?: number;

  @ApiProperty({
    example: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'An array of sizes of the product',
    nullable: false,
  })
  @IsString({ each: true })
  @IsArray()
  sizes: string[];

  @ApiProperty({
    example: 'men',
    description: 'Product ID',
    nullable: false,
  })
  @IsIn(['men', 'woman', 'kids', 'unisex'])
  gender: string;

  @ApiProperty({
    example: ['sweatshirt'],
    description: 'Gender of the product',
    nullable: true,
  })
  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty({
    example: ['1740176-00-A_0_2000.jpg', '1740176-00-A_1.jpg'],
    description: 'Array of the products images',
    nullable: true,
  })
  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  images?: string[];
}
