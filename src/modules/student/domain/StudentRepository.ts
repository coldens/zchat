import { StudentId } from '../../shared/domain/ValueObjects/StudentId';
import { Student } from './Student';

export interface StudentRepository {
  findOne(id: StudentId): Promise<Student | null>;
  findMany(id: StudentId[]): Promise<Student[]>;
  save(student: Student): Promise<void>;
}
