import { QueryHandler } from '@nestjs/cqrs';
import { GetDailyReportQuery } from './GetDailyReportQuery';
import { GetDailyReportService } from './GetDailyReportService';

@QueryHandler(GetDailyReportQuery)
export class GetDailyReportHandler {
  constructor(private service: GetDailyReportService) {}

  async execute(query: GetDailyReportQuery) {
    const result = await this.service.run(query.date);
    return result;
  }
}
