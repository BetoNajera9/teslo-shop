import { Injectable } from '@nestjs/common';

import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed.data';


@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductsService
  ) { }

  async runSeed() {
    await this.insertNewProduct()

    return 'SEED EXECUTE'
  }

  private async insertNewProduct() {
    this.productService.deleteAllProducts()

    const products = initialData.products

    const insertPromise = products.map((product) => this.productService.create(product))
    await Promise.all(insertPromise)

    return true
  }
}
