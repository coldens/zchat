import { mapValues } from 'lodash';
import { Addressable } from '../../shared/domain/ValueObjects/Addressable';
import { MessageBody } from '../domain/MessageBody';
import { MessageCriteria, SubmitDateRange } from '../domain/MessageCriteria';

export class MongoMessageCriteria {
  constructor(private criteria: MessageCriteria) {}

  query() {
    const mapper = (val: any) => {
      if (Array.isArray(val)) {
        return val.map(mapper);
      }
      if (val instanceof MessageBody) {
        return {
          type: val.type,
          value: val.value,
        };
      }
      if (val instanceof Addressable) {
        return {
          type: val.type,
          value: val.value,
        };
      }
      if (val instanceof SubmitDateRange) {
        return {
          $gt: val.start,
          $lt: val.end,
        };
      }

      return val.value;
    };

    return mapValues(this.criteria.where, mapper);
  }

  sortBy() {
    return this.criteria.sort?.by;
  }

  sortDir() {
    return this.criteria.sort?.dir === 'asc' ? 1 : -1;
  }
}
