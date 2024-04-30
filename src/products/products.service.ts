import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid'
import {
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
  Injectable,
  Logger,
} from '@nestjs/common';

import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);

      await this.productRepository.save(product);

      return product;
    } catch (error) {
      this.handlerError(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto

    return this.productRepository.find({
      take: limit,
      skip: offset
    })
  }

  async findOne(term: string) {
    let product: Product

    if (isUUID(term))
      product = await this.productRepository.findOneBy({ id: term });
    else {
      const query = this.productRepository.createQueryBuilder()
      product = await query
        .where('UPPER(title) =:title or slug =:slug', {
          title: term.toUpperCase(),
          slug: term.toLowerCase()
        }).getOne()
    }

    if (!product)
      throw new NotFoundException(`Product with id ${term} not found`);

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.preload({
        id,
        ...updateProductDto
      })

      if (!product)
        throw new NotFoundException(`Product with id ${id} not found`);

      await this.productRepository.save(product)

      return product
    } catch (error) {
      this.handlerError(error)
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id);

    return this.productRepository.remove(product);
  }

  private handlerError(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
