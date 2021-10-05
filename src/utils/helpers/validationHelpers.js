import {Joi} from 'express-validation';

export const loginValidationSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
}

export const studentDetailsValidationSchema = {
  body: Joi.object().keys({
    offset: Joi.number().required(),
    assignedOnly: Joi.bool().required(),
  }),
}