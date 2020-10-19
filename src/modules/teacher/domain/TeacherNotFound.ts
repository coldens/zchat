import { DomainError } from '../../shared/domain/DomainError';
import { TeacherId } from '../../shared/domain/ValueObjects/TeacherId';

export class TeacherNotFound extends DomainError {
  constructor(id: TeacherId) {
    super(`Teacher with id <${id.value}> not found`);
  }
}
