import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetMonthlyReportQuery } from '../../../../../modules/reports/application/monthly/GetMonthlyReportQuery';
import { JoiValidationPipe } from '../../../../shared/validations/JoiValidationPipe';
import { MonthlySchemaValidation } from './MonthlySchemaValidation';

@Controller('/backoffice/reports/monthly')
export class MonthlyReportGetController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async monthly(
    @Query(new JoiValidationPipe(MonthlySchemaValidation))
    query: any,
  ) {
    const start = new Date(query.year, query.month, 1);
    const end = new Date(
      start.getFullYear(),
      start.getMonth() + 1,
      0,
      23,
      59,
      59,
    );

    const report = await this.queryBus.execute(
      new GetMonthlyReportQuery(start.toISOString(), end.toISOString()),
    );

    return report;
  }
}
