import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { ConversationId } from '../../../shared/domain/ValueObjects/ConversationId';
import { CourseId } from '../../../shared/domain/ValueObjects/CourseId';
import { StudentId } from '../../../shared/domain/ValueObjects/StudentId';
import { Conversation } from '../../domain/Conversation';
import { ConversationRepository } from '../../domain/ConversationRepository';
import { ConversationStartedAt } from '../../domain/ConversationStartedAt';

@Injectable()
export class CreateConversationService {
  constructor(
    @Inject('ConversationRepository')
    private conversationRepository: ConversationRepository,
    private eventBus: EventBus,
  ) {}

  async run(
    id: ConversationId,
    courseId: CourseId,
    studentId: StudentId,
    startedAt: ConversationStartedAt,
  ) {
    const conversation = Conversation.create(
      id,
      courseId,
      studentId,
      startedAt,
    );

    const events = conversation.pullEvents();
    const result = await this.conversationRepository.findOne(id);

    // si la conversación ya existe, lo salta.
    if (result) {
      return;
    }

    await this.conversationRepository.create(conversation);
    this.eventBus.publishAll(events);

    return;
  }
}
