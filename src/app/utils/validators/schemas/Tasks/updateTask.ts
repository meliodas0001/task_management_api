import { ITasksUpdate } from '@domains/requests/tasks/tasksUpdate';
import * as Joi from 'joi';

export const UpdateTaskSchema = Joi.object<ITasksUpdate>({
  containerId: Joi.string().required(),
  id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  folderId: Joi.string().required(),
  status: Joi.string().equal('Open', 'InProgress', 'Done').required(),
});
