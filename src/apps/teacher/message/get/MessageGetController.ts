import {
  Controller,
  Get,
  HttpStatus,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindMessagesForConversationQuery } from '../../../../modules/message/application/findMessagesForConversation/FindMessagesForConversationQuery';
import { JwtAuthGuard } from '../../auth/auth/JwtAuthGuard';

@Controller('teacher/messages')
@UseGuards(JwtAuthGuard)
export class MessageGetController {
  constructor(private queryBus: QueryBus) {}

  @Get('/')
  async index(
    @Query(
      'conversationId',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    conversationId: string,
  ) {
    const messages: any[] = await this.queryBus.execute(
      new FindMessagesForConversationQuery(conversationId),
    );

    return messages;
  }
}
