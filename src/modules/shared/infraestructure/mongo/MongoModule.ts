import { Module } from '@nestjs/common';
import { mongoProvider } from './MongoProvider';

@Module({
  providers: [mongoProvider],
  exports: [mongoProvider],
})
export class MongoModule {}
