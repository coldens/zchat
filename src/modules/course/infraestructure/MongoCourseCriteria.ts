import { mapValues, omit } from 'lodash';
import { CourseCriteria } from '../domain/CourseCriteria';

export class MongoCourseCriteria {
  static query(criteria: CourseCriteria) {
    const mapper = (field: any) => {
      if (Array.isArray(field)) {
        return { $in: field.map((f) => f.value) };
      }

      return field.value;
    };

    const values = mapValues(criteria, mapper);
    return { _id: values.id, ...omit(values, 'id') };
  }
}
