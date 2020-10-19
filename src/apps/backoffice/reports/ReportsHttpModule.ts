import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DailyReportGetController } from './daily/get/DailyReportGetController';
import { MonthlyReportGetController } from './monthly/get/MonthlyReportGetController';

@Module({
  imports: [CqrsModule],
  controllers: [DailyReportGetController, MonthlyReportGetController],
})
export class ReportsHttpModule {}
