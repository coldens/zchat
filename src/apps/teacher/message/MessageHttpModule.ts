import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MessageGetController } from './get/MessageGetController';
import { MessagePostController } from './post/MessagePostController';

@Module({
  imports: [CqrsModule],
  controllers: [MessagePostController, MessageGetController],
})
export class MessageHttpModule {}
