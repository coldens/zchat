import * as Joi from '@hapi/joi';

export const RegisterStudentSchema = Joi.object({
  conversationId: Joi.string()
    .uuid({ version: 'uuidv4' })
    .required(),
  courseId: Joi.string()
    .uuid({ version: 'uuidv4' })
    .required(),
  studentId: Joi.string()
    .uuid({ version: 'uuidv4' })
    .required(),

  name: Joi.string()
    .min(3)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  avatar: Joi.string().uri(),
});
