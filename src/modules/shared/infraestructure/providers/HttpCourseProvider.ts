import Axios, { AxiosInstance } from 'axios';
import { Course } from '../../../course/domain/Course';
import { TeacherId } from '../../domain/ValueObjects/TeacherId';

export class HttpCourseImporter {
  private http: AxiosInstance;

  constructor() {
    const baseURL = this.getBaseURL();
    this.http = Axios.create({ baseURL });
  }

  async run(id: TeacherId) {
    const { data } = await this.http.get(
      '/api/services/courses/teacher/' + id.value,
    );
    const courses: Course[] = data.map(this.parseToCourse);
    return courses;
  }

  private getBaseURL() {
    const baseUri = process.env.ADMIN_URI;

    if (!baseUri) {
      return null;
    }
    return baseUri;
  }

  private parseToCourse(doc: any) {
    return Course.fromPrimitives(doc.uuid, doc.name, doc.image);
  }
}
