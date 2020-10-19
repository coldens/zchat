import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindAllConversationQuery } from '../modules/conversation/application/findAll/FindAllConversationQuery';
import { RecalculateCounterCommand } from '../modules/unreadConversationCounter/application/Recalculate/RecalculateCounterCommand';

@Injectable()
export class RecalculateCounters implements OnApplicationBootstrap {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  async onApplicationBootstrap() {
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    const conversations: any[] = await this.queryBus.execute(
      new FindAllConversationQuery(),
    );

    await Promise.all(
      conversations.map(({ id }) =>
        this.commandBus.execute(new RecalculateCounterCommand(id)),
      ),
    );

    Logger.log('Calculo completado.');
  }
}
