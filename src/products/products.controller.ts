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
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRolesEnum } from 'src/auth/enums';
import { PaginationDto } from 'src/common/dto';
import { User } from 'src/auth/entities';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @Auth(ValidRolesEnum.admin)
  create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User
  ) {
    return this.productsService.create(createProductDto, user);
  }

  @Get()
  @Auth(ValidRolesEnum.user)
  findAll(@Query() pagiantionDto: PaginationDto) {
    return this.productsService.findAll(pagiantionDto);
  }

  @Get(':term')
  @Auth(ValidRolesEnum.user)
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlain(term)
  }

  @Patch(':id')
  @Auth(ValidRolesEnum.admin)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User
  ) {
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  @Auth(ValidRolesEnum.superUser)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
