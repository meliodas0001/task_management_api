import { Status } from '@prisma/client';

export interface ICreateTaskDTO {
  name: string;
  description: string;
  folderId: string;
  author: string;
  status: Status;
}
