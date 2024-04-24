import * as Joi from 'joi';

import { ICreateFolder } from '@domains/requests/folders/createFolder';

export const FoldersCreateSchema = Joi.object<ICreateFolder>({
  name: Joi.string().max(30).required(),
  description: Joi.string().max(255).optional(),
  containerId: Joi.string().required(),
});
