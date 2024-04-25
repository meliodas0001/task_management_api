import { ORMTransactionInstance } from '@domains/database/ORM';
import { ITasksEntity } from '@domains/database/entities/Tasks/TasksEntity';
import { ICreateTaskDTO } from '@domains/requests/tasks/tasksCreate';
import { ITasksUpdate } from '@domains/requests/tasks/tasksUpdate';

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
    transaction: ORMTransactionInstance,
  ): Promise<ITasksEntity[]>;

  public abstract findById(
    taskId: string,
    transaction: ORMTransactionInstance,
  ): Promise<ITasksEntity>;

  public abstract updateTask(
    task: ITasksUpdate,
    transaction: ORMTransactionInstance,
  ): Promise<void>;
}
