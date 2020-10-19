import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CounterGetController } from './get/CounterGetController';

@Module({
  imports: [CqrsModule],
  controllers: [CounterGetController],
})
export class CounterHttpModule {}
