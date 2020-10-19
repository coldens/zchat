import { random } from 'lodash';
import { Conversation } from '../../../../src/modules/conversation/domain/Conversation';
import { ConversationStartedAt } from '../../../../src/modules/conversation/domain/ConversationStartedAt';
import { ConversationId } from '../../../../src/modules/shared/domain/ValueObjects/ConversationId';
import { CourseId } from '../../../../src/modules/shared/domain/ValueObjects/CourseId';
import { StudentId } from '../../../../src/modules/shared/domain/ValueObjects/StudentId';

export class ConversationMother {
  static random() {
    return new Conversation(
      ConversationId.random(),
      CourseId.random(),
      StudentId.random(),
      ConversationStartedAt.now(),
    );
  }

  static getManyRandom(min: number, max?: number): Conversation[] {
    if (!max) {
      max = min;
    }

    const randomArray = Array.from(Array(random(min, max)));
    return randomArray.map(() => ConversationMother.random());
  }
}
