import { MessageReport } from './MessageReport';

export interface MessageReportRepository {
  daily(date: Date): Promise<MessageReport[]>;
}
