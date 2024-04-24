import { ORMTransactionInstance } from '@domains/database/ORM';
import { ITasksRepository } from '@domains/database/repositories/TasksRepository/ITasksRepository';
import { ICreateTaskDTO } from '@domains/requests/tasks/tasksCreate';

export class TasksRepository implements ITasksRepository {
  public async createTask(
    task: ICreateTaskDTO,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    const { author, description, folderId, name, status } = task;

    await transaction.tasks.create({
      data: {
        author,
        description,
        folderId,
        name,
        status,
      },
    });
  }
}
