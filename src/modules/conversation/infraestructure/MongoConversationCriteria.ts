import { mapValues, omit, set } from 'lodash';
import { ConversationCriteria } from '../domain/ConversationCriteria';

export class MongoConversationCriteria {
  static query(criteria: ConversationCriteria) {
    const mapper = (field: any) => {
      if (Array.isArray(field)) {
        return { $in: field.map((f) => f.value) };
      }

      return field.value;
    };

    const values = mapValues(criteria, mapper);

    if (values.id) set(values, '_id', values.id);
    return { ...omit(values, 'id') };
  }
}
