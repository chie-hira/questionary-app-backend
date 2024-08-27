import { Test, TestingModule } from '@nestjs/testing';
import { AnswerDetailService } from '../answer-detail.service';

describe('AnswerDetailService', () => {
  let service: AnswerDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerDetailService],
    }).compile();

    service = module.get<AnswerDetailService>(AnswerDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
