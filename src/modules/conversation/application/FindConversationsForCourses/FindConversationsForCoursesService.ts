import { Inject, Injectable } from '@nestjs/common';
import { CourseId } from '../../../shared/domain/ValueObjects/CourseId';
import { ConversationRepository } from '../../domain/ConversationRepository';

@Injectable()
export class FindConversationsForCoursesService {
  constructor(
    @Inject('ConversationRepository')
    private repository: ConversationRepository,
  ) {}

  async run(courseId: CourseId[]) {
    const conversations = await this.repository.findByCriteria({ courseId });
    return conversations;
  }
}
