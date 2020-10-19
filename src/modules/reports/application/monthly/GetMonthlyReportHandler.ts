import { QueryHandler } from '@nestjs/cqrs';
import { GetMonthlyReportQuery } from './GetMonthlyReportQuery';
import { GetMonthlyReportService } from './GetMonthlyReportService';

@QueryHandler(GetMonthlyReportQuery)
export class GetMonthlyReportHandler {
  constructor(private service: GetMonthlyReportService) {}

  async execute(query: GetMonthlyReportQuery) {
    const result = await this.service.run(query.start, query.end);
    return result;
  }
}
