import { Test, TestingModule } from '@nestjs/testing';
import { AnswerDetailResolver } from './answer-detail.resolver';

describe('AnswerDetailResolver', () => {
  let resolver: AnswerDetailResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerDetailResolver],
    }).compile();

    resolver = module.get<AnswerDetailResolver>(AnswerDetailResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
