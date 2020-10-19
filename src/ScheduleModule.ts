import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { BoundedContextModule } from './modules/BoundedContextModule';
import { ImportCoursesAndTeachers } from './schedules/ImportCoursesAndTeachers';
import { RecalculateCounters } from './schedules/RecalculateCounters';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CqrsModule,
    BoundedContextModule,
  ],
  controllers: [],
  providers: [ImportCoursesAndTeachers, RecalculateCounters],
})
export class ScheduleModule {}
