export class RegisterStudentCommand {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly avatar: string,
  ) {}
}
