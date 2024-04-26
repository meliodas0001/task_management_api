import { UserDTO } from '../User/UserEntity';
import { Role } from '@prisma/client';

export interface ContainersEntity {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  public: boolean;
}

export interface ContainersFindById {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  public: boolean;

  users: UserDTO[];
}
