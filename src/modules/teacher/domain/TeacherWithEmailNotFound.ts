import { DomainError } from '../../shared/domain/DomainError';
import { TeacherEmail } from './TeacherEmail';

export class TeacherWithEmailNotFound extends DomainError {
  constructor(email: TeacherEmail) {
    super(`Teacher with email <${email.value}> not found`);
  }
}
