import { CommandHandler } from '@nestjs/cqrs';
import { MessageId } from '../../../shared/domain/ValueObjects/MessageId';
import { MessageReaderService } from './MessageReaderService';
import { SetMessageReadedCommand } from './SetMessageReadedCommand';

@CommandHandler(SetMessageReadedCommand)
export class SetMessageReadedHandler {
  constructor(private service: MessageReaderService) {}

  async execute(query: SetMessageReadedCommand) {
    await this.service.run(new MessageId(query.id));
  }
}
