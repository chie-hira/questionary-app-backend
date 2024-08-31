import { CreateAnswerChoiceInput } from 'src/answer-choice/dto/createAnswerChoice.input.dto';
import { CreateQuestionInput } from '../dto/createQuestion.input.dto';
import { AnswerFormat } from '../enums/question.enum';
import { QuestionModel } from '../models/question.model';

export const questionId = 1;
export const userId = 1;
export const mockUser = { id: 1 };

export const mockQuestions: QuestionModel[] = [
  {
    id: 1,
    question: 'test',
    user: {
      id: userId,
      email: 'test@emial.com',
      name: 'test',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
      questions: [],
    },
    answerChoices: [
      {
        id: 1,
        answerChoice: 'test choice',
        question: {
          id: 1,
          question: 'test',
          user: {
            id: 1,
            email: 'test@emial.com',
            name: 'test',
            password: 'password',
            createdAt: new Date(),
            updatedAt: new Date(),
            questions: [],
          },
          answerFormat: AnswerFormat.MULTIPLE_CHOICE,
          answerChoices: [],
          answerResults: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        answerDetails: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    answerFormat: AnswerFormat.MULTIPLE_CHOICE,
    answerResults: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    question: 'test2',
    user: {
      id: userId,
      email: 'test2@emial.com',
      name: 'test2',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
      questions: [],
    },
    answerChoices: [
      {
        id: 1,
        answerChoice: 'test choice2',
        question: {
          id: 2,
          question: 'test2',
          user: {
            id: 2,
            email: 'test2@emial.com',
            name: 'test2',
            password: 'password',
            createdAt: new Date(),
            updatedAt: new Date(),
            questions: [],
          },
          answerFormat: AnswerFormat.MULTIPLE_CHOICE,
          answerChoices: [],
          answerResults: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        answerDetails: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    answerFormat: AnswerFormat.MULTIPLE_CHOICE,
    answerResults: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const createQuestionInput: CreateQuestionInput = {
  question: 'new question',
  answerFormat: AnswerFormat.MULTIPLE_CHOICE,
  userId: 1,
};

export const createAnswerChoicesInput: CreateAnswerChoiceInput[] = [
  { answerChoice: 'Choice 1' },
  { answerChoice: 'Choice 2' },
];

export const newMockQuestion: QuestionModel = {
  id: 3,
  question: createQuestionInput.question,
  user: {
    id: createQuestionInput.userId,
    email: 'test@emial.com',
    name: 'test',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [],
  },
  answerChoices: createAnswerChoicesInput.map((choice) => ({
    id: 99,
    answerChoice: choice.answerChoice,
    question: newMockQuestion,
    user: {
      id: 1,
      email: 'test@emial.com',
      name: 'test',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
      questions: [],
    },
    answerDetails: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
  answerFormat: AnswerFormat.MULTIPLE_CHOICE,
  answerResults: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const addedQuestions: QuestionModel[] =
  mockQuestions.concat(newMockQuestion);

export const mockQuestionById: QuestionModel = mockQuestions.find(
  (question) => question.id === questionId,
);

export const mockQuestionByUserId: QuestionModel[] = mockQuestions.filter(
  (question) => question.user.id === 1,
);
