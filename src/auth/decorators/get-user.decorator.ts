import {
  InternalServerErrorException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

import { User } from '../entities';

export const GetUser = createParamDecorator(
  (data: (keyof User)[], ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (!user)
      throw new InternalServerErrorException('User not found in request');

    if (data) {
      const userFiltered = {};

      data.forEach((key) => {
        userFiltered[key] = user[key];
      });

      return userFiltered;
    }

    return user;
  },
);
