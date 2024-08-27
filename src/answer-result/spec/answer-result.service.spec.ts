import { Test, TestingModule } from '@nestjs/testing';
import { AnswerResultService } from '../answer-result.service';

describe('AnswerResultService', () => {
  let service: AnswerResultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerResultService],
    }).compile();

    service = module.get<AnswerResultService>(AnswerResultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
