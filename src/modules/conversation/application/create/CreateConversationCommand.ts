export class CreateConversationCommand {
  constructor(
    readonly id: string,
    readonly courseId: string,
    readonly studentId: string,
    readonly startedAt: string,
  ) {}
}
