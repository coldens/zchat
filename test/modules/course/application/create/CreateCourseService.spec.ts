import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateCourseService } from '../../../../../src/modules/course/application/create/CreateCourseService';
import { CourseRepository } from '../../../../../src/modules/course/domain/CourseRepository';
import { CourseMother } from '../../domain/CourseMother';
import { MockCourseRepository } from '../../infraestructure/MockCourseRepository';

describe('CreateCourseService', () => {
  let repository: CourseRepository;
  let service: CreateCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: 'CourseRepository',
          useFactory: () => MockCourseRepository,
        },
        CreateCourseService,
      ],
    }).compile();

    repository = module.get('CourseRepository');
    service = module.get(CreateCourseService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should be course created', async () => {
    const givenCourse = CourseMother.random();

    const spyOnSave = jest.spyOn(repository, 'save').mockResolvedValueOnce();

    await service.run(givenCourse.id, givenCourse.name, givenCourse.avatar);

    expect(spyOnSave).toBeCalledWith(expect.objectContaining(givenCourse));
  });
});
