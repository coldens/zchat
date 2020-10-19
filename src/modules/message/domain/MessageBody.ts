export class MessageBody {
  constructor(readonly type: ValidType, readonly value: string) {}

  toPrimitives() {
    return {
      type: <string>this.type,
      value: <string>this.value,
    };
  }
}

export type ValidType = 'text' | 'file';
