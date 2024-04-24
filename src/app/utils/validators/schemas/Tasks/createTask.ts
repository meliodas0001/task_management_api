import * as Joi from 'joi';

import { ICreateTaskDTO } from '@domains/requests/tasks/tasksCreate';

export const CreateTaskSchema = Joi.object<ICreateTaskDTO>({
  name: Joi.string().max(30).required(),
  description: Joi.string().max(255).required(),
  folderId: Joi.string().required(),
  status: Joi.string().equal('Open', 'InProgress', 'Done').required(),
});
