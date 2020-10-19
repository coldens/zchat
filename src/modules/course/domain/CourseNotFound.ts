import { DomainError } from '../../shared/domain/DomainError';
import { CourseId } from '../../shared/domain/ValueObjects/CourseId';

export class CourseNotFound extends DomainError {
  constructor(id: CourseId) {
    super(`<${id.value}> course not found`);
  }
}
