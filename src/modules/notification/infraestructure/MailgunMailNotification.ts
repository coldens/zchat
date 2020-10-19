import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mailgun from 'mailgun-js';
import * as pug from 'pug';
import { CourseName } from '../../course/domain/CourseName';
import { ConversationId } from '../../shared/domain/ValueObjects/ConversationId';
import { CourseId } from '../../shared/domain/ValueObjects/CourseId';
import { StudentName } from '../../student/domain/StudentName';
import { TeacherEmail } from '../../teacher/domain/TeacherEmail';
import { MailNotification } from '../domain/MailNotification';

@Injectable()
export class MailgunMailNotification implements MailNotification {
  private mailgun: mailgun.Mailgun;

  constructor(private config: ConfigService) {
    this.mailgun = mailgun({
      apiKey: config.get('MAILGUN_KEY'),
      domain: config.get('MAILGUN_DOMAIN'),
    });
  }

  async send(
    conversationId: ConversationId,
    courseId: CourseId,
    studentName: StudentName,
    teacherEmail: TeacherEmail,
    courseName: CourseName,
  ): Promise<void> {
    const fromEmail: string = this.config.get('MAIL_FROM_ADDRESS');
    const fromName: string = this.config.get('MAIL_FROM_NAME');
    const basePath = process.cwd();
    const compiledFunction = pug.compileFile(
      basePath + '/pug/notification/template.pug',
    );
    const baseURL = this.config.get('BASE_URL');
    const conversationURL = `${baseURL}/${courseId.value}/${conversationId.value}`;

    const html = compiledFunction({
      studentName: studentName.value,
      courseName: courseName.value,
      conversationURL,
    });

    await this.mailgun.messages().send({
      from: `${fromName} <${fromEmail}>`,
      to: teacherEmail.value,
      subject: 'Nuevo mensaje en el chat',
      html,
    });
  }
}
