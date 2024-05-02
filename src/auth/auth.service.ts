import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as Bcrypt from 'bcrypt'
import {
  InternalServerErrorException,
  UnauthorizedException,
  BadRequestException,
  Injectable,
  Logger,
} from '@nestjs/common';

import { CreateUserDto, LoginUserDto } from './dto';
import { PayloadInterface } from './interfaces';
import { User } from './entities';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async register(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto

      const user = this.userRepository.create({
        ...userData,
        password: Bcrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user);

      delete user.password

      return {
        ...user,
        token: this.getToken({ id: user.id })
      }
    } catch (error) {
      this.handlerError(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto

    const user = await this.userRepository.findOne({
      where: { email },
      select: { id: true, password: true, email: true }
    })

    if (!user)
      throw new UnauthorizedException('Credential not valid')

    if (!Bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credential not valid')

    return {
      ...user,
      token: this.getToken({ id: user.id })
    }
  }

  private getToken(payload: PayloadInterface) {
    return this.jwtService.sign(payload)
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getToken({ id: user.id })
    }
  }

  private handlerError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
