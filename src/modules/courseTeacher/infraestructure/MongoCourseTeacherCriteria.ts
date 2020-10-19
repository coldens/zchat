import { mapValues, omit, set } from 'lodash';
import { CourseTeacherCriteria } from '../domain/CourseTeacherCriteria';

export class MongoCourseTeacherCriteria {
  static query(criteria: CourseTeacherCriteria) {
    const mapper = (field: CriteriaField) => {
      if (Array.isArray(field)) {
        return { $in: field.map((v) => v.value) };
      }

      return field.value;
    };

    const values = mapValues(criteria, mapper);
    if (values.id) set(values, '_id', values.id);
    return { ...omit(values, 'id') };
  }
}

type CriteriaField = CourseTeacherCriteria[keyof CourseTeacherCriteria];
