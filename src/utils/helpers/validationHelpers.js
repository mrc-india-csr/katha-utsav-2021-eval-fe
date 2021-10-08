import {Joi} from 'express-validation';

export const loginValidationSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
}

export const studentDetailsValidationSchema = {
  body: Joi.object().keys({
    dataSet: Joi.number().required(),
    assignedOnly: Joi.bool().required(),
    storyFilter: Joi.string().valid('All', 'Fiction', 'Non-Fiction', 'Poetry').required(),
    statusFilter: Joi.string().valid('PENDING', 'APPROVED', 'DECLINED').required(),
  }),
}