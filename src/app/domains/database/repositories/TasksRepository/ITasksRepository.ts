import { ORMTransactionInstance } from '@domains/database/ORM';
import { ITasksEntity } from '@domains/database/entities/Tasks/TasksEntity';
import { ICreateTaskDTO } from '@domains/requests/tasks/tasksCreate';

export abstract class ITasksRepository {
  public abstract createTask(
    task: ICreateTaskDTO,
    transaction: ORMTransactionInstance,
  ): Promise<void>;

  public abstract deleteTask(
    taskId: string,
    transaction: ORMTransactionInstance,
  ): Promise<void>;

  public abstract findMany(
    folderId: string,
    tansaction: ORMTransactionInstance,
  ): Promise<ITasksEntity[]>;

  public abstract findById(
    taskId: string,
    transaction: ORMTransactionInstance,
  ): Promise<ITasksEntity>;

  public abstract updateTask(
    task: any,
    transaction: ORMTransactionInstance,
  ): Promise<void>;
}
