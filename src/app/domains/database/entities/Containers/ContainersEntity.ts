import { Roles } from '@prisma/client';
import { UserEntity } from '../User/UserEntity';

export interface ContainersEntity {
  id: string;
  name: string;
  description: string;
  ownerId: string;
}

export interface ContainersFindById {
  id: string;
  name: string;
  description: string;
  ownerId: string;

  users: UserEntity[];
}
