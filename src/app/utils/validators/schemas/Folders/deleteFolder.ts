import * as Joi from 'joi';

import { IDeleteFolder } from '@domains/requests/folders/deleteFolder';

export const DeleteFolderSchema = Joi.object<IDeleteFolder>({
  containerId: Joi.string().required(),
  folderId: Joi.string().required(),
});
