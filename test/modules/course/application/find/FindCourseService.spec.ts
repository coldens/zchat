import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { FindCourseQuery } from '../../../../../src/modules/course/application/find/FindCourseQuery';
import { FindCourseQueryHandler } from '../../../../../src/modules/course/application/find/FindCourseQueryHandler';
import { FindCourseService } from '../../../../../src/modules/course/application/find/FindCourseService';
import { CourseRepository } from '../../../../../src/modules/course/domain/CourseRepository';
import { CourseMother } from '../../domain/CourseMother';
import { MockCourseRepository } from '../../infraestructure/MockCourseRepository';

describe('FindCourseService', () => {
  let repository: CourseRepository;
  let service: FindCourseService;
  let handler: FindCourseQueryHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: 'CourseRepository',
          useFactory: () => MockCourseRepository,
        },
        FindCourseService,
        FindCourseQueryHandler,
      ],
    }).compile();

    repository = module.get('CourseRepository');
    service = module.get(FindCourseService);
    handler = module.get(FindCourseQueryHandler);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(service).toBeDefined();
    expect(handler).toBeDefined();
  });

  it('should be course found', async () => {
    const givenCourse = CourseMother.random();

    jest.spyOn(repository, 'find').mockResolvedValueOnce(givenCourse);

    const result = await handler.execute(
      new FindCourseQuery(givenCourse.id.value),
    );

    expect(result).toMatchObject(givenCourse.toPrimitives());
  });
});
