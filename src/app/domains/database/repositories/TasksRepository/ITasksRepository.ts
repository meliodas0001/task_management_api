import { ORMTransactionInstance } from '@domains/database/ORM';
import { ICreateTaskDTO } from '@domains/requests/tasks/tasksCreate';

export abstract class ITasksRepository {
  public abstract createTask(
    task: ICreateTaskDTO,
    transaction: ORMTransactionInstance,
  ): Promise<void>;
}
