import * as Joi from 'joi';

import { IUserCreate } from '@domains/requests/users/users';

export const CreateUserSchema = Joi.object<IUserCreate>({
  username: Joi.string().max(30).required(),
  password: Joi.string().max(30).required(),
  email: Joi.string().email().required(),
});
