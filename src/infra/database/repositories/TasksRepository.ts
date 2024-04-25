import { ORMTransactionInstance } from '@domains/database/ORM';
import { ITasksEntity } from '@domains/database/entities/Tasks/TasksEntity';
import { ITasksRepository } from '@domains/database/repositories/TasksRepository/ITasksRepository';
import { ICreateTaskDTO } from '@domains/requests/tasks/tasksCreate';
import { ITasksUpdate } from '@domains/requests/tasks/tasksUpdate';

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

  public async findMany(
    folderId: string,
    transaction: ORMTransactionInstance,
  ): Promise<ITasksEntity[]> {
    return await transaction.tasks.findMany({
      where: {
        folderId,
      },
    });
  }
  public async updateTask(
    task: ITasksUpdate,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    const { id, description, folderId, status, title } = task;

    await transaction.tasks.update({
      where: {
        id,
      },
      data: {
        description,
        folderId,
        status,
        name: title,
      },
    });
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
