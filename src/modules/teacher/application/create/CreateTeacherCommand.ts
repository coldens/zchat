export class CreateTeacherCommand {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly lastname: string,
    readonly email: string,
    readonly password: string,
    readonly avatar?: string,
  ) {}
}
