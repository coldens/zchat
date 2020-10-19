import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { omit, uniq } from 'lodash';
import { FindConversationQuery } from '../../../../modules/conversation/application/find/FindConversationQuery';
import { FindConversationsForCoursesQuery } from '../../../../modules/conversation/application/FindConversationsForCourses/FindConversationsForCoursesQuery';
import { FindCourseTeacherListForCourseQuery } from '../../../../modules/courseTeacher/application/FindCourseTeacherListForCourse/FindCourseTeacherListForCourseQuery';
import { FindMessagesForConversationQuery } from '../../../../modules/message/application/findMessagesForConversation/FindMessagesForConversationQuery';
import { FindStudentQuery } from '../../../../modules/student/application/find/FindStudentQuery';
import { FindManyStudentQuery } from '../../../../modules/student/application/FindManyStudent/FindManyStudentQuery';
import { FindManyTeacherQuery } from '../../../../modules/teacher/application/FindManyTeacher/FindManyTeacherQuery';
import { FindUnreadConversationCountersForConversationsQuery } from '../../../../modules/unreadConversationCounter/application/FindUnreadConversationCountersForConversations/FindUnreadConversationCountersForConversationsQuery';
import { JwtAuthGuard } from '../../auth/auth/JwtAuthGuard';
import { ConversationNotFoundFilter } from './ConversationNotFoundFilter';

@Controller('teacher/conversations')
@UseFilters(new ConversationNotFoundFilter())
@UseGuards(JwtAuthGuard)
export class ConversationGetController {
  constructor(private queryBus: QueryBus) {}

  @Get('/')
  async index(
    @Query(
      'courseId',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    courseId: string,
  ) {
    let conversations = await this.queryBus.execute(
      new FindConversationsForCoursesQuery([courseId]),
    );
    const counters = await this.queryBus.execute(
      new FindUnreadConversationCountersForConversationsQuery(
        conversations.map(({ id }) => id),
      ),
    );
    const students = await this.queryBus.execute(
      new FindManyStudentQuery(conversations.map((c) => c.studentId)),
    );

    conversations = conversations.map((conversation) => {
      const counter = counters.find(
        ({ conversationId }) => conversation.id === conversationId,
      );
      conversation.unread = 0;

      if (counter) {
        conversation.unread = counter.totalCourse;
      }

      return conversation;
    });

    return { conversations, students };
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    const conversation = await this.queryBus.execute(
      new FindConversationQuery(id),
    );

    return conversation;
  }

  @Get(':id/chat')
  async chat(@Param('id') id: string) {
    const conversation = await this.queryBus.execute(
      new FindConversationQuery(id),
    );
    const student = await this.queryBus.execute(
      new FindStudentQuery(conversation.studentId),
    );
    const messages: any[] = await this.queryBus.execute(
      new FindMessagesForConversationQuery(conversation.id),
    );
    const courseTeacherList: any[] = await this.queryBus.execute(
      new FindCourseTeacherListForCourseQuery(conversation.courseId),
    );
    const teachers: any[] = await this.queryBus.execute(
      new FindManyTeacherQuery(
        uniq([
          ...messages
            .filter((m) => m.from.type === 'teacher')
            .map((m) => m.from.value),
          ...courseTeacherList.map((ct) => ct.teacherId),
        ]),
      ),
    );

    return {
      conversation,
      student: omit(student, 'password'),
      messages,
      teachers: teachers.map((t) => omit(t, 'password')),
    };
  }
}
