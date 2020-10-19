import * as Joi from '@hapi/joi';

export const MonthlySchemaValidation = Joi.object({
  year: Joi.number()
    .integer()
    .min(2020)
    .max(new Date().getFullYear())
    .required(),

  month: Joi.number()
    .integer()
    .min(1)
    .max(12)
    .required(),
});
