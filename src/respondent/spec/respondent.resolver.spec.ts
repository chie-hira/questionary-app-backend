import { Test, TestingModule } from '@nestjs/testing';
import { RespondentResolver } from '../respondent.resolver';

describe('RespondentResolver', () => {
  let resolver: RespondentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RespondentResolver],
    }).compile();

    resolver = module.get<RespondentResolver>(RespondentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
