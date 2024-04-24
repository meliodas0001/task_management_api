import { ORMTransactionInstance } from '@domains/database/ORM';
import { ITasksEntity } from '@domains/database/entities/Tasks/TasksEntity';
import { ITasksRepository } from '@domains/database/repositories/TasksRepository/ITasksRepository';
import { ICreateTaskDTO } from '@domains/requests/tasks/tasksCreate';

export class TasksRepository implements ITasksRepository {
  public async deleteTask(
    taskId: string,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    await transaction.tasks.delete({
      where: {
        id: taskId,
      },
    });
  }

  public async findById(
    taskId: string,
    transaction: ORMTransactionInstance,
  ): Promise<ITasksEntity> {
    return await transaction.tasks.findUnique({
      where: {
        id: taskId,
      },
    });
  }

  public findMany(
    folderId: string,
    tansaction: ORMTransactionInstance,
  ): Promise<ITasksEntity[]> {
    throw new Error('Method not implemented.');
  }
  public updateTask(
    task: any,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

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
