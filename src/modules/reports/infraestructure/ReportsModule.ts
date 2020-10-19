import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongoModule } from '../../shared/infraestructure/mongo/MongoModule';
import { GetDailyReportHandler } from '../application/daily/GetDailyReportHandler';
import { GetDailyReportService } from '../application/daily/GetDailyReportService';
import { GetMonthlyReportHandler } from '../application/monthly/GetMonthlyReportHandler';
import { GetMonthlyReportService } from '../application/monthly/GetMonthlyReportService';
import { MongoMessageReportRepository } from './MongoMessageReportRepository';
import { MongoMonthlyReportRepository } from './MongoMonthlyReportRepository';

const queryHandlers = [GetDailyReportHandler, GetMonthlyReportHandler];
const services = [GetDailyReportService, GetMonthlyReportService];

@Module({
  imports: [MongoModule, CqrsModule],
  providers: [
    {
      provide: 'MessageReportRepository',
      useClass: MongoMessageReportRepository,
    },
    {
      provide: 'MonthlyReportRepository',
      useClass: MongoMonthlyReportRepository,
    },
    ...queryHandlers,
    ...services,
  ],
})
export class ReportsModule {}
