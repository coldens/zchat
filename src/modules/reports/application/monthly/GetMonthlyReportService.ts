import { Inject, Injectable } from '@nestjs/common';
import { MonthlyReportRepository } from '../../domain/MonthlyReportRepository';

@Injectable()
export class GetMonthlyReportService {
  constructor(
    @Inject('MonthlyReportRepository')
    private repository: MonthlyReportRepository,
  ) {}

  async run(start: string, end: string) {
    const result = await this.repository.monthly(start, end);
    return result;
  }
}
