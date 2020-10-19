import axios, { AxiosInstance } from 'axios';
import { TeacherId } from '../../shared/domain/ValueObjects/TeacherId';
import { Teacher } from '../domain/Teacher';
import { TeacherEmail } from '../domain/TeacherEmail';

export class HttpTeacherProvider {
  private http: AxiosInstance;

  constructor() {
    const baseURL = this.getBaseUri();
    this.http = axios.create({ baseURL });
  }

  async findOne(id: TeacherId): Promise<Teacher> {
    const teacher = await this.get(id.value);

    if (teacher) {
      return this.parseToAggregate(teacher);
    }

    return null;
  }

  async findByEmail(email: TeacherEmail): Promise<Teacher> {
    const teacher = await this.get(email.value);

    if (teacher) {
      return this.parseToAggregate(teacher);
    }

    return null;
  }

  private parseToAggregate(doc: any) {
    return Teacher.fromPrimitives(
      doc.uuid,
      doc.name,
      `${doc.first_lastname} ${doc.second_lastname}`.trim(),
      doc.email,
      doc.password,
      doc.avatar,
    );
  }

  private async get(email: string) {
    const { data } = await this.http.get(`/api/services/teachers/${email}`);
    return data;
  }

  private getBaseUri() {
    const baseUri = process.env.ADMIN_URI;

    if (!baseUri) {
      return null;
    }

    return baseUri;
  }
}
