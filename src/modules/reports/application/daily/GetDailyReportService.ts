import { Inject, Injectable } from '@nestjs/common';
import { MessageReportRepository } from '../../domain/MessageReportRepository';

@Injectable()
export class GetDailyReportService {
  constructor(
    @Inject('MessageReportRepository')
    private repository: MessageReportRepository,
  ) {}

  async run(date: string) {
    const messages = await this.repository.daily(new Date(date));
    return messages;
  }
}
