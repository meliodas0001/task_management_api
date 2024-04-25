import { ORMTransactionInstance } from '@domains/database/ORM';
import { IFoldersRepository } from '@domains/database/repositories/FoldersRepository/IFoldersRepository';
import { ITasksRepository } from '@domains/database/repositories/TasksRepository/ITasksRepository';
import { ITasksUpdate } from '@domains/requests/tasks/tasksUpdate';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TaskUpdateService {
  constructor(
    private readonly tasksRepository: ITasksRepository,
    private readonly foldersRepository: IFoldersRepository,
  ) {}

  async execute(
    task: ITasksUpdate,
    transaction: ORMTransactionInstance,
  ): Promise<void> {
    const taskFind = await this.tasksRepository.findById(task.id, transaction);

    if (!taskFind) {
      throw new NotFoundException('Task not found');
    }

    const folder = await this.foldersRepository.findFolder(
      task.folderId,
      transaction,
    );

    if (!folder) {
      throw new NotFoundException('Folder not found');
    }

    // verify user permission

    await this.tasksRepository.updateTask(task, transaction);
  }
}
