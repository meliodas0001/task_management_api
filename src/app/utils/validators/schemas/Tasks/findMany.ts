import { IFindMany } from '@domains/requests/tasks/tasksFindMany';
import * as Joi from 'joi';

export const FindManyTasksSchema = Joi.object<IFindMany>({
  folderId: Joi.string().required(),
});
