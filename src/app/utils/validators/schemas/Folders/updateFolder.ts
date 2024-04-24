import { IUpdateFolder } from '@domains/requests/folders/updateFolder';
import * as Joi from 'joi';

export const UpdateFolderSchema = Joi.object<IUpdateFolder>({
  description: Joi.string().required(),
  id: Joi.string().required(),
  name: Joi.string().required(),
});
