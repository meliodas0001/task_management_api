import * as Joi from 'joi';

export interface IContainerFindById {
  containerId: string;
}

export const ContainerFindByIdSchema = Joi.object({
  containerId: Joi.string().required().uuid(),
});
