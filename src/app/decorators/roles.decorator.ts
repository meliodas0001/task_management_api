import { SetMetadata } from '@nestjs/common';
import { Roles as roles } from '@prisma/client';

export const Roles = (...roles: roles[]) => SetMetadata('roles', roles);
