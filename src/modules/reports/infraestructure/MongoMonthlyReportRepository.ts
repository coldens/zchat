import { differenceInHours } from 'date-fns';
import { MongoRepository } from '../../shared/infraestructure/mongo/MongoRepository';
import { MonthlyReport } from '../domain/MonthlyReport';
import { MonthlyReportRepository } from '../domain/MonthlyReportRepository';

export class MongoMonthlyReportRepository extends MongoRepository
  implements MonthlyReportRepository {
  protected moduleName(): string {
    return 'teacher';
  }

  async monthly(start: string, end: string): Promise<MonthlyReport[]> {
    const teachers = await this.collection()
      .find()
      .toArray();

    const report = [];

    for (let index = 0; index < teachers.length; index++) {
      const teacher = teachers[index];

      const teacherMessages = await this.collection('messages')
        .find({
          from: {
            type: 'teacher',
            value: teacher._id,
          },
          submitDate: { $gte: new Date(start), $lte: new Date(end) },
        })
        .toArray();

      let times: number[] = [];

      for (let index = 0; index < teacherMessages.length; index++) {
        const teacherMessage = teacherMessages[index];
        const studentMessage = await this.collection('messages').findOne(
          {
            'from.type': 'student',
            conversationId: teacherMessage.conversationId,
            submitDate: { $lte: new Date(teacherMessage.submitDate) },
          },
          { sort: { submitDate: -1 } },
        );

        if (studentMessage) {
          const diference = differenceInHours(
            teacherMessage.submitDate,
            studentMessage.submitDate,
          );

          times.push(diference);
        }
      }

      report.push({
        name: teacher.name,
        lastname: teacher.lastname,
        email: teacher.email,
        totalMessages: teacherMessages.length,
        estimatedTime: this.estimatedTime(times),
      });
    }

    return report;
  }

  private estimatedTime(values: number[]) {
    if (values.length === 0) {
      return 0;
    }

    const sum = values.reduce((a, b) => a + b, 0);
    const average = sum / values.length;

    return average;
  }
}
