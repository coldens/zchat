import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindConversationsForCoursesQuery } from '../../../../modules/conversation/application/FindConversationsForCourses/FindConversationsForCoursesQuery';
import { FindCourseTeacherListForTeacherQuery } from '../../../../modules/courseTeacher/application/FindCourseTeacherListForTeacher/FindCourseTeacherListForTeacherQuery';
import { FindUnreadConversationCountersForConversationsQuery } from '../../../../modules/unreadConversationCounter/application/FindUnreadConversationCountersForConversations/FindUnreadConversationCountersForConversationsQuery';
import { JwtAuthGuard } from '../../auth/auth/JwtAuthGuard';

@Controller('teacher/counters')
@UseGuards(JwtAuthGuard)
export class CounterGetController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async getCounters(@Request() req) {
    const { id } = req.user;
    const coursesTeacher: any[] = await this.queryBus.execute(
      new FindCourseTeacherListForTeacherQuery(id),
    );
    const coursesId: string[] = coursesTeacher.map(({ courseId }) => courseId);

    const conversations: any[] = await this.queryBus.execute(
      new FindConversationsForCoursesQuery(coursesId),
    );
    const counters: any[] = await this.queryBus.execute(
      new FindUnreadConversationCountersForConversationsQuery(
        conversations.map((c) => c.id),
      ),
    );

    return coursesId.map((id) => {
      const countersCourse = counters.filter(({ conversationId }) => {
        const { courseId } = conversations.find((c) => c.id === conversationId);
        return courseId === id;
      });

      let total = 0;

      countersCourse.forEach((cc) => {
        total += cc.totalCourse;
      });

      return { id, total };
    });
  }
}
