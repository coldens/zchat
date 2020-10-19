import { mapValues, omit, set } from 'lodash';
import { TeacherCriteria } from '../domain/TeacherCriteria';

export class MongoTeacherCriteriaParser {
  static query(criteria: TeacherCriteria) {
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

type CriteriaField = TeacherCriteria[keyof TeacherCriteria];
