import { InjectQueue } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { CourseName } from '../../course/domain/CourseName';
import { ConversationId } from '../../shared/domain/ValueObjects/ConversationId';
import { CourseId } from '../../shared/domain/ValueObjects/CourseId';
import { StudentName } from '../../student/domain/StudentName';
import { TeacherEmail } from '../../teacher/domain/TeacherEmail';
import { MailNotification } from '../domain/MailNotification';

export class QueueMailNotification implements MailNotification {
  constructor(
    @InjectQueue('teacher-mail')
    private queue: Queue,
  ) {}

  async send(
    conversationId: ConversationId,
    courseId: CourseId,
    studentName: StudentName,
    teacherEmail: TeacherEmail,
    courseName: CourseName,
  ): Promise<void> {
    try {
      await this.queue.add(
        {
          conversationId: conversationId.value,
          courseId: courseId.value,
          studentName: studentName.value,
          teacherEmail: teacherEmail.value,
          courseName: courseName.value,
        },
        {
          attempts: 3,
        },
      );
    } catch (err) {
      Logger.error(err.message);
    }
  }
}
