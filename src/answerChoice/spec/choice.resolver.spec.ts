import { Test, TestingModule } from '@nestjs/testing';
import { AnswerChoiceResolver } from '../answerChoice.resolver';

describe('AnswerChoiceResolver', () => {
  let resolver: AnswerChoiceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerChoiceResolver],
    }).compile();

    resolver = module.get<AnswerChoiceResolver>(AnswerChoiceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
