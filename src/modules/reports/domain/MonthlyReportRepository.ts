import { MonthlyReport } from './MonthlyReport';

export interface MonthlyReportRepository {
  monthly(start: string, end: string): Promise<MonthlyReport[]>;
}
