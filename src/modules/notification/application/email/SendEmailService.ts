import { Inject, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindConversationQuery } from '../../../conversation/application/find/FindConversationQuery';
import { FindCourseQuery } from '../../../course/application/find/FindCourseQuery';
import { CourseName } from '../../../course/domain/CourseName';
import { FindCourseTeacherListForCourseQuery } from '../../../courseTeacher/application/FindCourseTeacherListForCourse/FindCourseTeacherListForCourseQuery';
import { FindMessageQuery } from '../../../message/application/find/FindMessageQuery';
import { ConversationId } from '../../../shared/domain/ValueObjects/ConversationId';
import { CourseId } from '../../../shared/domain/ValueObjects/CourseId';
import { MessageId } from '../../../shared/domain/ValueObjects/MessageId';
import { FindStudentQuery } from '../../../student/application/find/FindStudentQuery';
import { StudentName } from '../../../student/domain/StudentName';
import { FindManyTeacherQuery } from '../../../teacher/application/FindManyTeacher/FindManyTeacherQuery';
import { TeacherEmail } from '../../../teacher/domain/TeacherEmail';
import { MailNotification } from '../../domain/MailNotification';

@Injectable()
export class SendEmailService {
  constructor(
    @Inject('MailNotification')
    private mailNotification: MailNotification,
    private queryBus: QueryBus,
  ) {}

  async run(messageId: MessageId) {
    const message = await this.queryBus.execute(
      new FindMessageQuery(messageId.value),
    );

    if (message.from.type === 'teacher') {
      return;
    }

    const conversation = await this.queryBus.execute(
      new FindConversationQuery(message.conversationId),
    );
    const student = await this.queryBus.execute(
      new FindStudentQuery(conversation.studentId),
    );
    const course = await this.queryBus.execute(
      new FindCourseQuery(conversation.courseId),
    );
    const courseTeacherList: any[] = await this.queryBus.execute(
      new FindCourseTeacherListForCourseQuery(course.id),
    );
    const teachers: any[] = await this.queryBus.execute(
      new FindManyTeacherQuery(courseTeacherList.map((ct) => ct.teacherId)),
    );

    await Promise.all(
      teachers.map((teacher) => {
        return this.mailNotification.send(
          new ConversationId(conversation.id),
          new CourseId(conversation.courseId),
          new StudentName(student.name),
          new TeacherEmail(teacher.email),
          new CourseName(course.name),
        );
      }),
    );
  }
}
