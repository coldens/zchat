import { DomainError } from '../../shared/domain/DomainError';
import { StudentId } from '../../shared/domain/ValueObjects/StudentId';

export class StudentNotFound extends DomainError {
  constructor(id: StudentId) {
    super(`Student with id <${id.value}> not found`);
  }
}
