import { ORMTransactionInstance } from '@domains/database/ORM';
import { ITasksRepository } from '@domains/database/repositories/TasksRepository/ITasksRepository';
import { ICreateTaskDTO } from '@domains/requests/tasks/tasksCreate';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskCreateService {
  constructor(private readonly tasksRepository: ITasksRepository) {}

  async execute(task: ICreateTaskDTO, transaction: ORMTransactionInstance) {
    // Verify if user has permission

    await this.tasksRepository.createTask(task, transaction);
  }
}
