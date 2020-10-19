import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateConversationCommand } from '../../../../modules/conversation/application/create/CreateConversationCommand';
import { JoiValidationPipe } from '../../../shared/validations/JoiValidationPipe';
import { JwtAuthGuard } from '../../auth/auth/JwtAuthGuard';
import { CreateConversationSchema } from './CreateConversationSchema';

@Controller('teacher/conversations')
@UseGuards(JwtAuthGuard)
export class ConversationPostController {
  constructor(private commandBus: CommandBus) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new JoiValidationPipe(CreateConversationSchema))
    body: CreateConversationCommand,
  ) {
    const command = new CreateConversationCommand(
      body.id,
      body.courseId,
      body.studentId,
      new Date().toISOString(),
    );

    await this.commandBus.execute(command);

    return command;
  }
}
