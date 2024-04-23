import { Roles as PrismaRoles } from '.prisma/client';

export interface UserEntity {
  id?: string;
  username: string;
  email: string;
  password: string;
  roles?: PrismaRoles[];
}

export interface UserDTO {
  id: string;
  username: string;
  email: string;
  roles?: PrismaRoles[];
}
