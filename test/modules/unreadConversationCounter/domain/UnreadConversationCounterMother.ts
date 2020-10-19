import { random } from 'lodash';
import { ConversationId } from '../../../../src/modules/shared/domain/ValueObjects/ConversationId';
import { UnreadConversationCounterId } from '../../../../src/modules/shared/domain/ValueObjects/UnreadConversationCounterId';
import { UnreadConversationCounter } from '../../../../src/modules/unreadConversationCounter/domain/UnreadConversationCounter';
import { UnreadConversationCounterTotal } from '../../../../src/modules/unreadConversationCounter/domain/UnreadConversationCounterTotal';

export class UnreadConversationCounterMother {
  static random() {
    return new UnreadConversationCounter(
      UnreadConversationCounterId.random(),
      new UnreadConversationCounterTotal(random(5, 10, false)),
      new UnreadConversationCounterTotal(random(5, 10, false)),
      ConversationId.random(),
    );
  }

  static getManyRandom(min: number, max?: number) {
    if (!max) {
      max = min;
    }

    const randomArray = Array.from(Array(random(min, max)));
    return randomArray.map(() => UnreadConversationCounterMother.random());
  }
}
