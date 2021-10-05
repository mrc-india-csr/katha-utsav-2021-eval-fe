import {Joi} from 'express-validation';

export const loginValidationSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
}

export const studentDetailsValidationSchema = {
  body: Joi.object().keys({
    page: Joi.number().required(),
    assignedOnly: Joi.bool().required(),
    filter: Joi.string().required(),
    limit: Joi.number().required(),
  }),
}