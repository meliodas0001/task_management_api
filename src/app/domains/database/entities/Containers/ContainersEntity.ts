import { UserDTO } from '../User/UserEntity';

export interface ContainersEntity {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  isPublic: boolean;
}

export interface ContainersFindById {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  isPublic: boolean;

  users: UserDTO[];
}
