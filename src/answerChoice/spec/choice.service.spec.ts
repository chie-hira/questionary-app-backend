import { Test, TestingModule } from '@nestjs/testing';
import { AnswerChoiceService } from '../answerChoice.service';

describe('ChoiceService', () => {
  let service: AnswerChoiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerChoiceService],
    }).compile();

    service = module.get<AnswerChoiceService>(AnswerChoiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
