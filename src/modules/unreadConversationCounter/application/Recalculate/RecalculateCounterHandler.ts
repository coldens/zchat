import { CommandHandler } from '@nestjs/cqrs';
import { ConversationId } from '../../../shared/domain/ValueObjects/ConversationId';
import { RecalculateCounterCommand } from './RecalculateCounterCommand';
import { RecalculateCounterService } from './RecalculateCounterService';

@CommandHandler(RecalculateCounterCommand)
export class RecalculateCounterHandler {
  constructor(private service: RecalculateCounterService) {}

  async execute(command: RecalculateCounterCommand) {
    await this.service.run(new ConversationId(command.conversationId));
  }
}
