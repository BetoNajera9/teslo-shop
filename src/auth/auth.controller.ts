import { Controller, Post, Body, Get, UseGuards, Req, SetMetadata, Param, ParseUUIDPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserDto, LoginUserDto } from './dto';
import { rawHeaders } from 'src/common/decorators';
import { AuthService } from './auth.service';
import { UserRoleGuard } from './guards';
import { Auth, GetUser, RoleProtected } from './decorators';
import { User } from './entities';
import { ValidRolesEnum } from './enums';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private01')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser(['email', 'id']) user: User,
    @rawHeaders() rawHeaders: string[]
  ) {
    return {
      ok: true,
      message: 'Hola mundo',
      user,
      rawHeaders
    }
  }

  // @SetMetadata('roles', ['admin', 'super-user'])

  @Get('private02')
  @RoleProtected(ValidRolesEnum.superUser, ValidRolesEnum.admin)
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivate2Route(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      user,
    }
  }

  @Get('private03')
  @Auth(ValidRolesEnum.superUser, ValidRolesEnum.admin)
  testingPrivate3Route(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      user,
    }
  }
}
