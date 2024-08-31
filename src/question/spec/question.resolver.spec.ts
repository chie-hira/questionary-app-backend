import { Test, TestingModule } from '@nestjs/testing';
import { QuestionResolver } from '../question.resolver';
import { QuestionService } from '../question.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  createAnswerChoicesInput,
  createQuestionInput,
  mockQuestionById,
  mockQuestionByUserId,
  mockQuestions,
  newMockQuestion,
  questionId,
  userId,
} from './stub.spec';

describe('QuestionResolver', () => {
  let resolver: QuestionResolver;
  let questionService: QuestionService;

  const mockQuestionService = {
    getAllQuestions: jest.fn().mockResolvedValue(mockQuestions),
    getQuestionsByUser: jest.fn().mockResolvedValue(mockQuestionByUserId),
    getQuestionById: jest.fn().mockResolvedValue(mockQuestionById),
    createQuestionWithAnswerChoices: jest
      .fn()
      .mockResolvedValue(newMockQuestion),
    deleteQuestion: jest.fn().mockResolvedValue(newMockQuestion),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionResolver,
        { provide: QuestionService, useValue: mockQuestionService },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    resolver = module.get<QuestionResolver>(QuestionResolver);
    questionService = module.get<QuestionService>(QuestionService);
  });

  it('リゾルバは定義されています', () => {
    expect(resolver).toBeDefined();
  });

  it('should get all questions', async () => {
    const result = await resolver.getAllQuestions();
    expect(result).toEqual(mockQuestions);
    expect(questionService.getAllQuestions).toHaveBeenCalled();
  });

  it('should get questions by user', async () => {
    const result = await resolver.getQuestionsByUser(userId);
    expect(result).toEqual(mockQuestionByUserId);
    expect(questionService.getQuestionsByUser).toHaveBeenCalledWith(userId);
  });

  it('should get question by id', async () => {
    const result = await resolver.getQuestionById(questionId);

    expect(result).toEqual(
      mockQuestions.filter((question) => question.id === questionId)[0],
    );
    expect(questionService.getQuestionById).toHaveBeenCalledWith(questionId);
  });

  it('should create a question with answer choices', async () => {
    const result = await resolver.createQuestionWithAnswerChoices(
      createQuestionInput,
      createAnswerChoicesInput,
    );

    expect(result).toEqual(newMockQuestion);
    expect(
      questionService.createQuestionWithAnswerChoices,
    ).toHaveBeenCalledWith(createQuestionInput, createAnswerChoicesInput);
  });

  it('should delete a question', async () => {
    const result = await resolver.deleteQuestion(questionId);
    expect(result).toEqual(newMockQuestion);
    expect(questionService.deleteQuestion).toHaveBeenCalledWith(questionId);
  });
});
