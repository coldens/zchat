import { QueryHandler } from '@nestjs/cqrs';
import { MessageId } from '../../../shared/domain/ValueObjects/MessageId';
import { FindMessageQuery } from './FindMessageQuery';
import { FindMessageService } from './FindMessageService';

@QueryHandler(FindMessageQuery)
export class FindMessageHandler {
  constructor(private service: FindMessageService) {}

  async execute(query: FindMessageQuery) {
    const result = await this.service.run(new MessageId(query.id));
    return result.toPrimitives();
  }
}
