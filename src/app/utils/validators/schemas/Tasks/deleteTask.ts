import * as Joi from 'joi';

interface DeleteTaskDTO {
  taskId: string;
}

export const DeleteTaskSchema = Joi.object<DeleteTaskDTO>({
  taskId: Joi.string().required(),
});
