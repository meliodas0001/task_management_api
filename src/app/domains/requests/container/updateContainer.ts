import * as Joi from 'joi';

export interface IUpdateContainerSchema {
  containerId: string;
  name: string;
  description: string;
  isPublic: boolean;
}

export const UpdateContainerSchema = Joi.object<IUpdateContainerSchema>({
  containerId: Joi.string().required().uuid(),
  name: Joi.string().optional().min(3),
  description: Joi.string().optional().min(3),
  isPublic: Joi.boolean().optional(),
});
