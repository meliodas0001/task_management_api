import * as Joi from 'joi';

import { IDeleteContainer } from '@domains/requests/container/deleteContainer';

export const DeleteContainerSchema = Joi.object<IDeleteContainer>({
  containerId: Joi.string().required(),
});
