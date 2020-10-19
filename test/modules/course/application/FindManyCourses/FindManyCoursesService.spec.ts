import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { FindManyCoursesHandler } from '../../../../../src/modules/course/application/FindManyCourses/FindManyCoursesHandler';
import { FindManyCoursesQuery } from '../../../../../src/modules/course/application/FindManyCourses/FindManyCoursesQuery';
import { FindManyCoursesService } from '../../../../../src/modules/course/application/FindManyCourses/FindManyCoursesService';
import { CourseRepository } from '../../../../../src/modules/course/domain/CourseRepository';
import { CourseMother } from '../../domain/CourseMother';
import { MockCourseRepository } from '../../infraestructure/MockCourseRepository';

describe('FindManyCoursesService', () => {
  let repository: CourseRepository;
  let service: FindManyCoursesService;
  let handler: FindManyCoursesHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: 'CourseRepository',
          useFactory: () => MockCourseRepository,
        },
        FindManyCoursesService,
        FindManyCoursesHandler,
      ],
    }).compile();

    repository = module.get('CourseRepository');
    service = module.get(FindManyCoursesService);
    handler = module.get(FindManyCoursesHandler);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(service).toBeDefined();
    expect(handler).toBeDefined();
  });

  it('should be course created', async () => {
    const givenCourses = CourseMother.getMany();

    jest
      .spyOn(repository, 'findByCriteria')
      .mockResolvedValueOnce(givenCourses);

    const result = await handler.execute(
      new FindManyCoursesQuery(givenCourses.map((c) => c.id.value)),
    );

    expect(result).toHaveLength(givenCourses.length);
  });
});
