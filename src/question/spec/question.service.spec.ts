import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from '../question.service';
import { DataSource, Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { AnswerChoice } from '../../answer-choice/entities/answerChoice.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('QuestionService', () => {
  let service: QuestionService;
  let questionRepository: Repository<Question>;
  let answerChoiceRepository: Repository<AnswerChoice>;

  const mockQuestions = [
    { id: 1, question: 'test', user: { id: 1 }, answerChoices: [] },
    { id: 2, question: 'test2', user: { id: 2 }, answerChoices: [] },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: getRepositoryToken(Question),
          useValue: {
            find: jest.fn((options) => {
              if (options && options.where && options.where.user) {
                return Promise.resolve(
                  mockQuestions.filter(
                    (question) => question.user.id === options.where.user.id,
                  ),
                );
              }

              return Promise.resolve(mockQuestions);
            }),
            findOne: jest.fn((options) => {
              return Promise.resolve(
                mockQuestions.filter(
                  (question) => question.id === options.where.id,
                ),
              );
            }),
          },
        },
        {
          provide: getRepositoryToken(AnswerChoice),
          useValue: {},
        },
        {
          provide: DataSource,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
    questionRepository = module.get<Repository<Question>>(
      getRepositoryToken(Question),
    );
    answerChoiceRepository = module.get<Repository<AnswerChoice>>(
      getRepositoryToken(AnswerChoice),
    );
  });

  it('サービスは定義されています', () => {
    expect(service).toBeDefined();
  });

  it('getAllQuestions(): すべてのquestionsを取得できます', async () => {
    const result = await service.getAllQuestions();
    expect(result).toEqual(mockQuestions);
    expect(questionRepository.find).toHaveBeenCalled();
  });

  it('getQuestionsByUser(userId): userIdからquestionsを取得できます', async () => {
    const userId = 1;
    const result = await service.getQuestionsByUser(userId);

    const expectedQuestions = mockQuestions.filter(
      (question) => question.user.id === userId,
    );

    expect(result).toEqual(expectedQuestions);
    expect(questionRepository.find).toHaveBeenCalledWith({
      relations: ['user', 'answerChoices'],
      where: { user: { id: userId } },
    });
  });

  it('getQuestionById(id): idからquestionを取得できます', async () => {
    const id = 1;
    const result = await service.getQuestionById(id);

    const expectedQuestion = mockQuestions.filter(
      (question) => question.id === id,
    );

    expect(result).toEqual(expectedQuestion);
    expect(questionRepository.findOne).toHaveBeenCalledWith({
      relations: ['answerChoices'],
      where: { id },
    });
  });
});
