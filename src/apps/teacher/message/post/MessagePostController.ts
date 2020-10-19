import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateMessageCommand } from '../../../../modules/message/application/create/CreateMessageCommand';
import { CreateMessageBody } from '../../../shared/CreateMesageBody';
import { JoiValidationPipe } from '../../../shared/validations/JoiValidationPipe';
import { JwtAuthGuard } from '../../auth/auth/JwtAuthGuard';
import { CreateMessageSchema } from './CreateMessageSchema';

@Controller('teacher/messages')
@UseGuards(JwtAuthGuard)
export class MessagePostController {
  constructor(private commandBus: CommandBus) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new JoiValidationPipe(CreateMessageSchema))
    body: CreateMessageBody,
  ) {
    const submitDate = new Date().toISOString();

    await this.commandBus.execute(
      new CreateMessageCommand(
        body.id,
        body.conversationId,
        body.from,
        body.body,
        submitDate,
        false,
      ),
    );
  }
}
