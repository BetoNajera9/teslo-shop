import {
  ParseUUIDPipe,
  Controller,
  Delete,
  Query,
  Patch,
  Param,
  Body,
  Post,
  Get,
} from '@nestjs/common';

import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductsService } from './products.service';
import { PaginationDto } from 'src/common/dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() pagiantionDto: PaginationDto) {
    return this.productsService.findAll(pagiantionDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productsService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
