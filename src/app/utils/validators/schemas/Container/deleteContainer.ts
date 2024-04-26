import * as Joi from 'joi';

interface IDeleteContainer {
  containerId: string;
}

export const DeleteContainerSchema = Joi.object<IDeleteContainer>({
  containerId: Joi.string().required(),
});
