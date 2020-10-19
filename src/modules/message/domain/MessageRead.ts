export class MessageRead {
  private _value: boolean;

  constructor(value: boolean) {
    this._value = value;
  }

  read() {
    this._value = true;
  }

  get value() {
    return this._value;
  }
}
