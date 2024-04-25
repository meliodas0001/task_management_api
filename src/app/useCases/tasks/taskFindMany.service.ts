import { Injectable, NotFoundException } from '@nestjs/common';

import { IFoldersRepository } from '@domains/database/repositories/FoldersRepository/IFoldersRepository';
import { ITasksRepository } from '@domains/database/repositories/TasksRepository/ITasksRepository';
import { ITasksEntity } from '@domains/database/entities/Tasks/TasksEntity';
import { ORMTransactionInstance } from '@domains/database/ORM';

@Injectable()
export class TaskFindManyService {
  constructor(
    private readonly tasksRepository: ITasksRepository,
    private readonly foldersRepository: IFoldersRepository,
  ) {}

  async execute(
    folderId: string,
    transaction: ORMTransactionInstance,
  ): Promise<ITasksEntity[]> {
    const folder = await this.foldersRepository.findFolder(
      folderId,
      transaction,
    );

    if (!folder) {
      throw new NotFoundException('Folder not found');
    }

    return await this.tasksRepository.findMany(folderId, transaction);
  }
}
