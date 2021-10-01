import {Joi} from 'express-validation';

export const loginValidationSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
}