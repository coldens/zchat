export class CreateMessageCommand {
  constructor(
    readonly id: string,
    readonly conversationId: string,
    readonly from: any,
    readonly body: any,
    readonly submitDate: number | string | Date,
    readonly readed: boolean,
  ) {}
}
