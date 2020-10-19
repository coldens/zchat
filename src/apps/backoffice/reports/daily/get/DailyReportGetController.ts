import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { zonedTimeToUtc } from 'date-fns-tz';
import { GetDailyReportQuery } from '../../../../../modules/reports/application/daily/GetDailyReportQuery';

@Controller('/backoffice/reports/daily')
export class DailyReportGetController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async daily(@Query() query: any) {
    const zonedDate = zonedTimeToUtc(query.date, 'America/Lima');

    const report = await this.queryBus.execute(
      new GetDailyReportQuery(zonedDate.toISOString()),
    );

    return report;
  }
}
