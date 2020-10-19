import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateCourseService } from '../../../../../src/modules/course/application/create/CreateCourseService';
import { CourseImporterService } from '../../../../../src/modules/course/application/importer/CourseImporterService';
import { CourseRepository } from '../../../../../src/modules/course/domain/CourseRepository';
import { TeacherId } from '../../../../../src/modules/shared/domain/ValueObjects/TeacherId';
import { HttpCourseImporter } from '../../../../../src/modules/shared/infraestructure/providers/HttpCourseProvider';
import { CourseMother } from '../../domain/CourseMother';
import { MockCourseRepository } from '../../infraestructure/MockCourseRepository';

describe('CourseImporterService', () => {
  let repository: CourseRepository;
  let service: CourseImporterService;
  let httpCourseImporter: HttpCourseImporter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: 'CourseRepository',
          useFactory: () => MockCourseRepository,
        },
        HttpCourseImporter,
        CourseImporterService,
        CreateCourseService,
      ],
    }).compile();

    repository = module.get('CourseRepository');
    service = module.get(CourseImporterService);
    httpCourseImporter = module.get(HttpCourseImporter);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(service).toBeDefined();
    expect(httpCourseImporter).toBeDefined();
  });

  it('should be course created', async () => {
    const givenCourses = CourseMother.getMany();

    const spySave = jest.spyOn(repository, 'save').mockResolvedValue();
    jest.spyOn(httpCourseImporter, 'run').mockResolvedValueOnce(givenCourses);

    await service.run(TeacherId.random());

    expect(spySave).toBeCalledTimes(givenCourses.length);
  });
});
