import { Roles } from '@prisma/client';

export interface IContainerCreate {
  name: string;
  description: string;
  ownerId: string;
}

export interface IAddUserToContainer {
  userId: string;
  containerId: string;
  userRole?: Roles;
}
