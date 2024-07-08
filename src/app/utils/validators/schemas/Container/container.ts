import {
  IAddUserToContainer,
  IContainerCreate,
} from '@domains/requests/container/container';

import * as Joi from 'joi';

export const CreateContainerSchema = Joi.object<IContainerCreate>({
  description: Joi.string().optional(),
  name: Joi.string().max(30).required(),
});

export const AddUserContainerSchema = Joi.object<IAddUserToContainer>({
  containerId: Joi.string().required(),
  userId: Joi.string().required(),
  userRole: Joi.string().optional(),
});

export const UpdateUserRoleSchema = Joi.object<IAddUserToContainer>({
  containerId: Joi.string().required(),
  userId: Joi.string().required(),
  userRole: Joi.string().equal('Admin', 'User', 'Moderator').required(),
});
