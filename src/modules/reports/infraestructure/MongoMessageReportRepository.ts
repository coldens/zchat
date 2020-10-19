import { MongoRepository } from '../../shared/infraestructure/mongo/MongoRepository';
import { MessageReport } from '../domain/MessageReport';
import { MessageReportRepository } from '../domain/MessageReportRepository';

export class MongoMessageReportRepository extends MongoRepository
  implements MessageReportRepository {
  async daily(date: Date): Promise<MessageReport[]> {
    const start = new Date(date);
    const end = new Date(date);

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 59);

    const studentMessages = await this.aggregate()
      .match({
        'from.type': 'student',
        submitDate: { $gte: start, $lte: end },
      })
      .toArray();

    const teacherMessages = await this.aggregate()
      .match({
        'from.type': 'teacher',
        submitDate: { $gte: start },
      })
      .toArray();

    return studentMessages.map((message) => {
      const reply = teacherMessages.find(
        (tm) =>
          tm.conversationId === message.conversationId &&
          tm.submitDate > message.submitDate,
      );

      return this.parseToMessageReport(message, reply);
    });
  }

  protected moduleName(): string {
    return 'messages';
  }

  private aggregate() {
    return this.collection().aggregate([
      {
        $lookup: {
          from: 'conversations',
          localField: 'conversationId',
          foreignField: '_id',
          as: 'conversation',
        },
      },
      {
        $lookup: {
          from: 'course',
          localField: 'conversation.courseId',
          foreignField: '_id',
          as: 'course',
        },
      },
      {
        $lookup: {
          from: 'teacher',
          localField: 'from.value',
          foreignField: '_id',
          as: 'teacher',
        },
      },
      {
        $lookup: {
          from: 'student',
          localField: 'from.value',
          foreignField: '_id',
          as: 'student',
        },
      },
    ]);
  }

  private parseToMessageReport(studentMessage: any, reply: any): MessageReport {
    let teacherName = '';

    if (reply) {
      teacherName = reply.teacher[0].name;
      teacherName += reply.teacher[0].lastname || '';
      teacherName += ` <${reply.teacher[0].email}>`;
    }

    return {
      id: studentMessage._id,
      readed: studentMessage.readed,
      submitDate: studentMessage.submitDate,
      teacherName: teacherName,
      replyDate: reply?.submitDate || '',
      studentName: studentMessage.student[0]?.name,
      courseName: studentMessage.course[0]?.name,
    };
  }
}
