import { Status } from '@prisma/client';

export interface ICreateTaskDTO {
  containerId?: string;
  name: string;
  description: string;
  folderId: string;
  author: string;
  status: Status;
}
