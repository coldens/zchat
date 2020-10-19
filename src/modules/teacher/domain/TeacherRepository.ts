import { TeacherId } from '../../shared/domain/ValueObjects/TeacherId';
import { Teacher } from './Teacher';
import { TeacherCriteria } from './TeacherCriteria';
import { TeacherEmail } from './TeacherEmail';

export interface TeacherRepository {
  findByCriteria(criteria: TeacherCriteria): Promise<Teacher[]>;
  findOne(id: TeacherId): Promise<Teacher | null>;
  findByEmail(email: TeacherEmail): Promise<Teacher | null>;
  create(teacher: Teacher): Promise<void>;
  update(teacher: Teacher): Promise<void>;
  save(teacher: Teacher): Promise<void>;
}
