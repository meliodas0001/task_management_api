import * as Joi from 'joi';

export const AuthLoginSchema = Joi.object<ILogin>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
