import { Module } from '@nestjs/common';
import { ReportsHttpModule } from './reports/ReportsHttpModule';

@Module({
  imports: [ReportsHttpModule],
})
export class BackOfficeAppModule {}
