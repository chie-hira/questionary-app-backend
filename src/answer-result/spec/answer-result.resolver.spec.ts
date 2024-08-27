import { Test, TestingModule } from '@nestjs/testing';
import { AnswerResultResolver } from '../answer-result.resolver';

describe('AnswerResultResolver', () => {
  let resolver: AnswerResultResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerResultResolver],
    }).compile();

    resolver = module.get<AnswerResultResolver>(AnswerResultResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
