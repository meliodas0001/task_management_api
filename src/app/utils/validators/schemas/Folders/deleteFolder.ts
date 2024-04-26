import * as Joi from 'joi';

interface IDeleteFolderDTO {
  containerId: string;
  folderId: string;
}

export const DeleteFolderSchema = Joi.object<IDeleteFolderDTO>({
  containerId: Joi.string().required(),
  folderId: Joi.string().required(),
});
