import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { CourseName } from '../../course/domain/CourseName';
import { ConversationId } from '../../shared/domain/ValueObjects/ConversationId';
import { CourseId } from '../../shared/domain/ValueObjects/CourseId';
import { StudentName } from '../../student/domain/StudentName';
import { TeacherEmail } from '../../teacher/domain/TeacherEmail';
import { MailgunMailNotification } from './MailgunMailNotification';

@Injectable()
@Processor('teacher-mail')
export class QueueMailNotificationProcessor {
  constructor(private mailNotification: MailgunMailNotification) {}

  @Process()
  async process(job: Job<any>): Promise<void> {
    await this.send(job.data);
  }

  async send(data: any): Promise<void> {
    const conversationId = new ConversationId(data.conversationId);
    const courseId = new CourseId(data.courseId);
    const studentName = new StudentName(data.studentName);
    const teacherEmail = new TeacherEmail(data.teacherEmail);
    const courseName = new CourseName(data.courseName);

    await this.mailNotification.send(
      conversationId,
      courseId,
      studentName,
      teacherEmail,
      courseName,
    );
  }
}
