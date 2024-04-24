import { ContainersEntity } from '../Containers/ContainersEntity';
import { ITasksEntity } from '../Tasks/TasksEntity';

export interface IFoldersEntity {
  id: string;
  name: string;
  description: string;
  containerId: string;
  createdAt: Date;
  author: string;

  container: ContainersEntity;
  tasks: ITasksEntity[];
}
