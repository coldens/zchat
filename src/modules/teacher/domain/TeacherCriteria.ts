import { TeacherId } from '../../shared/domain/ValueObjects/TeacherId';

export interface TeacherCriteria {
  id: TeacherId | TeacherId[];
}
