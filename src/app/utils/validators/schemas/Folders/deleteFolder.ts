import * as Joi from 'joi';

interface IDeleteFolderDTO {
  folderId: string;
}

export const DeleteFolderSchema = Joi.object<IDeleteFolderDTO>({
  folderId: Joi.string().required(),
});
