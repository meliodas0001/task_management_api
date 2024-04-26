import * as Joi from 'joi';

interface DeleteTaskDTO {
  containerId: string;
  taskId: string;
}

export const DeleteTaskSchema = Joi.object<DeleteTaskDTO>({
  containerId: Joi.string().required(),
  taskId: Joi.string().required(),
});
