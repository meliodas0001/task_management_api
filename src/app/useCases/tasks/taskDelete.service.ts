import { ORMTransactionInstance } from '@domains/database/ORM';
import { ITasksRepository } from '@domains/database/repositories/TasksRepository/ITasksRepository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TaskDeleteService {
  constructor(private readonly tasksRepository: ITasksRepository) {}

  async execute(taskId: string, transaction: ORMTransactionInstance) {
    const task = this.tasksRepository.findById(taskId, transaction);

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    await this.tasksRepository.deleteTask(taskId, transaction);
  }
}
