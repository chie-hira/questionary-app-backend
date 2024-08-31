import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from '../question.service';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { AnswerChoice } from '../../answer-choice/entities/answerChoice.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateQuestionInput } from '../dto/createQuestion.input.dto';
import { CreateAnswerChoiceInput } from 'src/answer-choice/dto/createAnswerChoice.input.dto';
import { AnswerFormat } from '../enums/question.enum';

describe('QuestionService', () => {
  let service: QuestionService;
  let questionRepository: Repository<Question>;
  let answerChoiceRepository: Repository<AnswerChoice>;
  let dataSource: DataSource;
  let queryRunner: QueryRunner;

  const mockQuestions = [
    { id: 1, question: 'test', user: { id: 1 }, answerChoices: [{ id: 1 }] },
    { id: 2, question: 'test2', user: { id: 2 }, answerChoices: [] },
  ];

  const questionId = 1;
  const mockUser = { id: 1 };

  const createQuestionInput: CreateQuestionInput = {
    question: 'new question',
    answerFormat: AnswerFormat.MULTIPLE_CHOICE,
    userId: 1,
  };

  const createAnswerChoicesInput: CreateAnswerChoiceInput[] = [
    { answerChoice: 'Choice 1' },
    { answerChoice: 'Choice 2' },
  ];

  const newMockQuestion = {
    id: 3,
    question: createQuestionInput.question,
    user: { id: createQuestionInput.userId },
    answerChoices: createAnswerChoicesInput.map((choice) => ({
      id: 99,
      answerChoice: choice.answerChoice,
    })),
  };
  mockQuestions.push(newMockQuestion);

  beforeEach(async () => {
    queryRunner = {
      connect: jest.fn(),
      startTransaction: jest.fn(),
      manager: {
        findOne: jest.fn().mockResolvedValue(mockUser),
        save: jest.fn().mockImplementation((entity) => Promise.resolve(entity)),
      },
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
    } as unknown as QueryRunner;

    dataSource = {
      createQueryRunner: jest.fn().mockReturnValue(queryRunner),
    } as unknown as DataSource;

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
            findOne: jest
              .fn()
              .mockImplementation(({ where }) =>
                Promise.resolve(
                  mockQuestions.find((question) => question.id === where.id),
                ),
              ),
            create: jest.fn().mockImplementation(() => newMockQuestion),
            save: jest.fn().mockResolvedValue(newMockQuestion),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
        {
          provide: getRepositoryToken(AnswerChoice),
          useValue: {
            create: jest.fn().mockResolvedValue(mockQuestions[0]),
          },
        },
        {
          provide: DataSource,
          useValue: dataSource,
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

  it('getAllQuestions: すべてのquestionsを取得できます', async () => {
    const result = await service.getAllQuestions();
    expect(result).toEqual(mockQuestions);
    expect(questionRepository.find).toHaveBeenCalled();
  });

  it('getQuestionsByUser: userIdからquestionsを取得できます', async () => {
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

  it('getQuestionById: idからquestionを取得できます', async () => {
    const result = await service.getQuestionById(questionId);

    const expectedQuestion = mockQuestions.find(
      (question) => question.id === questionId,
    );

    expect(result).toEqual(expectedQuestion);
    expect(questionRepository.findOne).toHaveBeenCalledWith({
      relations: ['answerChoices'],
      where: { id: questionId },
    });
  });

  it('createQuestionWithAnswerChoices: quotationとanswerChoiceが作成され、作成されたquotationを取得できる', async () => {
    const result = await service.createQuestionWithAnswerChoices(
      createQuestionInput,
      createAnswerChoicesInput,
    );

    expect(result).toEqual(newMockQuestion);
    expect(questionRepository.create).toHaveBeenCalledWith({
      question: createQuestionInput.question,
      answerFormat: createQuestionInput.answerFormat,
      user: mockUser,
    });
    expect(queryRunner.manager.save).toHaveBeenCalledTimes(2);
    expect(queryRunner.manager.save).toHaveBeenCalledWith(newMockQuestion);
    expect(queryRunner.commitTransaction).toHaveBeenCalled();
    createAnswerChoicesInput.forEach((input) => {
      expect(answerChoiceRepository.create).toHaveBeenCalledWith({
        answerChoice: input.answerChoice,
        question: newMockQuestion,
      });
    });
  });

  it('createQuestionWithAnswerChoices: トランザクションが失敗した場合、ロールバックされる', async () => {
    queryRunner.manager.save = jest.fn().mockRejectedValue(new Error('Error'));

    await expect(
      service.createQuestionWithAnswerChoices(
        createQuestionInput,
        createAnswerChoicesInput,
      ),
    ).rejects.toThrow();

    expect(queryRunner.rollbackTransaction).toHaveBeenCalled();
  });

  it('createQuestionWithAnswerChoices: userが存在しない場合、エラーが発生する', async () => {
    queryRunner.manager.findOne = jest.fn().mockResolvedValue(null);

    await expect(
      service.createQuestionWithAnswerChoices(
        createQuestionInput,
        createAnswerChoicesInput,
      ),
    ).rejects.toThrow();
  });

  it('deleteQuestion: questionが削除される', async () => {
    await service.deleteQuestion(questionId);

    expect(questionRepository.delete).toHaveBeenCalledWith(questionId);
  });
});
