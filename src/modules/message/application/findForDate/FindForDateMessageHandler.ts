import { QueryHandler } from '@nestjs/cqrs';
import { FindForDateMessageQuery } from './FindForDateMessageQuery';
import { FindForDateMessageService } from './FindForDateMessageService';

@QueryHandler(FindForDateMessageQuery)
export class FindForDateMessageHandler {
  constructor(private service: FindForDateMessageService) {}

  async execute(query: FindForDateMessageQuery) {
    const messages = await this.service.run(query.date);
    return messages.map((m) => m.toPrimitives());
  }
}
