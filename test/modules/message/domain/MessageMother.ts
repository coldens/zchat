import * as faker from 'faker';
import { random as fakerRandom } from 'faker';
import { random } from 'lodash';
import { Message } from '../../../../src/modules/message/domain/Message';
import { MessageBody } from '../../../../src/modules/message/domain/MessageBody';
import { MessageRead } from '../../../../src/modules/message/domain/MessageRead';
import { MessageSubmitDate } from '../../../../src/modules/message/domain/MessageSubmitDate';
import {
  Addressable,
  ValidType as ValidTypeFrom,
} from '../../../../src/modules/shared/domain/ValueObjects/Addressable';
import { ConversationId } from '../../../../src/modules/shared/domain/ValueObjects/ConversationId';
import { MessageId } from '../../../../src/modules/shared/domain/ValueObjects/MessageId';
import { StudentId } from '../../../../src/modules/shared/domain/ValueObjects/StudentId';
import { TeacherId } from '../../../../src/modules/shared/domain/ValueObjects/TeacherId';

export class MessageMother {
  static random(conversationId?: ConversationId) {
    return new Message(
      MessageId.random(),
      conversationId ?? ConversationId.random(),
      MessageMother.getRandomFrom(),
      MessageMother.getRandomBody(),
      MessageSubmitDate.fromDate(new Date()),
      new MessageRead(fakerRandom.boolean()),
    );
  }

  static getManyRandom(
    min: number = 1,
    max: number = 10,
    conversationId?: ConversationId,
  ): Message[] {
    const randomArray = Array.from(Array(random(min, max)));
    return randomArray.map(() => MessageMother.random(conversationId));
  }

  static getRandomFrom() {
    const types: ValidTypeFrom[] = ['student', 'teacher'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    return new Addressable(
      randomType,
      MessageMother.randomValueFrom(randomType),
    );
  }

  static getRandomBody() {
    return new MessageBody('text', faker.lorem.paragraph());
  }

  static randomValueFrom(type: ValidTypeFrom): StudentId | TeacherId {
    return type === 'student' ? StudentId.random() : TeacherId.random();
  }
}
