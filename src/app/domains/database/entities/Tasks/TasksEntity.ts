import { Status } from '@prisma/client';

export interface ITasksEntity {
  id: string;
  name: string;
  description: string;
  folderId: string;
  author: string;
  createdAt: Date;
  status: Status;
}
