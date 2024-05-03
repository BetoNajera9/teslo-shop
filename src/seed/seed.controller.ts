import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ValidRolesEnum } from 'src/auth/enums';
import { SeedService } from './seed.service';
import { Auth } from 'src/auth/decorators';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  @Auth(ValidRolesEnum.superUser, ValidRolesEnum.admin)
  runSeed() {
    return this.seedService.runSeed();
  }
}
