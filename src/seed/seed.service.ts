import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed.data';
import { User } from 'src/auth/entities';


@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async runSeed() {
    await this.deleteTables()

    const adminUser = await this.insertUsers()

    await this.insertNewProduct(adminUser)

    return 'SEED EXECUTE'
  }

  private async deleteTables() {
    await this.productService.deleteAllProducts()

    const queryBuilder = this.userRepository.createQueryBuilder()
    await queryBuilder
      .delete()
      .where({})
      .execute()
  }

  private async insertUsers() {
    const seedUsers = initialData.users

    const users: User[] = []

    seedUsers.forEach(user => {
      users.push(this.userRepository.create(user))
    })

    const dbUsers = await this.userRepository.save(seedUsers)

    return dbUsers[0]
  }

  private async insertNewProduct(admin: User) {
    await this.productService.deleteAllProducts()

    const products = initialData.products

    const insertPromise = products.map((product) => this.productService.create(product, admin))
    await Promise.all(insertPromise)

    return true
  }
}
