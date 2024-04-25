import * as Joi from 'joi';

interface IFindManyDTO {
  folderId: string;
}

export const FindManyTasksSchema = Joi.object<IFindManyDTO>({
  folderId: Joi.string().required(),
});
