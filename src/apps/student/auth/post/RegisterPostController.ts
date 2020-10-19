import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateConversationCommand } from '../../../../modules/conversation/application/create/CreateConversationCommand';
import { JoiValidationPipe } from '../../../shared/validations/JoiValidationPipe';
import { RegisterStudentSchema } from './RegisterStudentSchema';
import { RegisterStudentService } from './RegisterStudentService';

@Controller('student/auth')
export class RegisterPostController {
  constructor(
    private service: RegisterStudentService,
    private commandBus: CommandBus,
  ) {}

  @Post('register')
  async register(
    @Body(new JoiValidationPipe(RegisterStudentSchema))
    body: BodyType,
  ) {
    await this.commandBus.execute(
      new CreateConversationCommand(
        body.conversationId,
        body.courseId,
        body.studentId,
        new Date().toISOString(),
      ),
    );

    return await this.service.register({ ...body, id: body.studentId });
  }
}

type BodyType = {
  conversationId: string;
  studentId: string;
  courseId: string;
  name: string;
  email: string;
  avatar: string;
};
