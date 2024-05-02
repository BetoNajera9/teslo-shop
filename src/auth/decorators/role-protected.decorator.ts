import { SetMetadata } from '@nestjs/common';

import { ValidRolesEnum } from '../enums';

export const META_ROLES = 'roles'

export const RoleProtected = (...args: ValidRolesEnum[]) => {
  return SetMetadata(META_ROLES, args);
}
