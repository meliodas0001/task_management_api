import { Status } from '@prisma/client';

export interface ITasksUpdate {
  containerId?: string;
  id: string;
  title: string;
  description: string;
  folderId: string;
  status: Status;
}
