import { IDeleteTask } from '@domains/requests/tasks/tasksDelete';
import * as Joi from 'joi';

export const DeleteTaskSchema = Joi.object<IDeleteTask>({
  containerId: Joi.string().required(),
  taskId: Joi.string().required(),
});
