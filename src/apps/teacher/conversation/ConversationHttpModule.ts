import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConversationGetController } from './get/ConversationGetController';
import { ConversationPostController } from './post/ConversationPostController';

@Module({
  imports: [CqrsModule],
  controllers: [ConversationGetController, ConversationPostController],
})
export class ConversationHttpModule {}
