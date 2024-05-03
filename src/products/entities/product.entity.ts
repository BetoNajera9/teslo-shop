import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToOne,
  Entity,
  Column,
} from 'typeorm';

import { ProductImage } from './product-image.entity';
import { User } from 'src/auth/entities';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '2b26dc33-cb7d-4983-add2-031b20d0fc4f',
    description: 'Product ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Men’s Chill Crew Neck Sweatshirt',
    description: 'Name of the product',
  })
  @Column('text', {
    unique: true,
  })
  title: string;

  @ApiProperty({
    example: 75.5,
    description: 'Price of the product',
  })
  @Column('float', {
    default: 0,
  })
  price: number;

  @ApiProperty({
    example:
      'Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.',
    description: 'Description of the products',
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @ApiProperty({
    example: 'mens_chill_crew_neck_sweatshirt',
    description: 'slug product',
  })
  @Column('text', {
    unique: true,
  })
  slug: string;

  @ApiProperty({
    example: 7,
    description: 'Number of products in stock',
  })
  @Column('int', {
    default: 0,
  })
  stock: number;

  @ApiProperty({
    example: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'An array of sizes of the product',
  })
  @Column('text', {
    array: true,
  })
  sizes: string[];

  @ApiProperty({
    example: 'men',
    description: 'Product ID',
  })
  @Column('text')
  gender: string;

  @ApiProperty({
    example: ['sweatshirt'],
    description: 'Gender of the product',
  })
  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  @ApiProperty({
    example: ['1740176-00-A_0_2000.jpg', '1740176-00-A_1.jpg'],
    description: 'Array of the products images',
  })
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug)
      this.slug = this.title
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '_');
    else
      this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '_');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '_');
  }
}
