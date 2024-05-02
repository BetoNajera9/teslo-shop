import { Controller, Get } from '@nestjs/common';

import { ValidRolesEnum } from 'src/auth/enums';
import { SeedService } from './seed.service';
import { Auth } from 'src/auth/decorators';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @Get()
  // @Auth(ValidRolesEnum.superUser, ValidRolesEnum.admin)
  runSeed() {
    return this.seedService.runSeed()
  }
}
