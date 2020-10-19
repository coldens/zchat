import * as Joi from '@hapi/joi';

export const CreateConversationSchema = Joi.object({
  id: Joi.string()
    .uuid({ version: 'uuidv4' })
    .required(),
  courseId: Joi.string()
    .uuid({ version: 'uuidv4' })
    .required(),
  studentId: Joi.string()
    .uuid({ version: 'uuidv4' })
    .required(),
});
