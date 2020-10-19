import { QueryHandler } from '@nestjs/cqrs';
import { CourseId } from '../../../shared/domain/ValueObjects/CourseId';
import { FindConversationsForCoursesQuery } from './FindConversationsForCoursesQuery';
import { FindConversationsForCoursesService } from './FindConversationsForCoursesService';

@QueryHandler(FindConversationsForCoursesQuery)
export class FindConversationsForCoursesHandler {
  constructor(private service: FindConversationsForCoursesService) {}

  async execute(query: FindConversationsForCoursesQuery) {
    const conversations = await this.service.run(
      query.coursesId.map((id) => new CourseId(id)),
    );

    return conversations.map((conversation) => conversation.toPrimitives());
  }
}
