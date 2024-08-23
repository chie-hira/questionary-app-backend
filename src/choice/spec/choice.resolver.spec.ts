import { Test, TestingModule } from '@nestjs/testing';
import { ChoiceResolver } from '../choice.resolver';

describe('ChoiceResolver', () => {
  let resolver: ChoiceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChoiceResolver],
    }).compile();

    resolver = module.get<ChoiceResolver>(ChoiceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
