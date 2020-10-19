import * as Joi from '@hapi/joi';

export const MessageFromSchema = Joi.object({
  type: Joi.any()
    .allow('student', 'teacher')
    .required(),
  value: Joi.string()
    .uuid({ version: 'uuidv4' })
    .required(),
});

export const MessageBodySchema = Joi.object({
  type: Joi.any()
    .allow('text', 'file')
    .required(),
  value: Joi.string().required(),
});

export const CreateMessageSchema = Joi.object({
  id: Joi.string()
    .uuid({ version: 'uuidv4' })
    .required(),
  conversationId: Joi.string()
    .uuid({ version: 'uuidv4' })
    .required(),
  from: MessageFromSchema,
  body: MessageBodySchema,
  submitDate: Joi.date().iso(),
});
