import { Status } from '@prisma/client';

export interface ITasksUpdate {
  id: string;
  title: string;
  description: string;
  folderId: string;
  status: Status;
}
