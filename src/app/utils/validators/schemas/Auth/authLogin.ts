import * as Joi from 'joi';

import { ILogin } from '@domains/requests/auth/login';

export const AuthLoginSchema = Joi.object<ILogin>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
