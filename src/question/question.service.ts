import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QuestionModel } from './models/question.model';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionInput } from './dto/createQuestion.input.dto';
import { AnswerChoice } from '../answerChoice/entities/answerChoice.entity';
import { CreateAnswerChoiceInput } from '../answerChoice/dto/createAnswerChoice.input.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<QuestionModel>,
    @InjectRepository(AnswerChoice)
    private readonly choiceRepository: Repository<AnswerChoice>,
  ) {}

  async getAllQuestions(): Promise<QuestionModel[]> {
    return await this.questionRepository.find();
  }

  async getQuestionsByUser(userId: number): Promise<QuestionModel[]> {
    return await this.questionRepository.find({
      relations: ['user', 'choices'],
      where: { user: { id: userId } },
    });
  }

  async createQuestionWithAnswerChoices(
    createQuestionInput: CreateQuestionInput,
    createAnswerChoicesInput: CreateAnswerChoiceInput[],
  ): Promise<QuestionModel> {
    const { question, answerFormat, userId } = createQuestionInput;

    const newQuestion = this.questionRepository.create({
      question,
      answerFormat,
      user: { id: userId } as User,
    });
    await this.questionRepository.save(newQuestion);

    const newChoices = createAnswerChoicesInput.map((choiceInput) => {
      return this.choiceRepository.create({
        choice: choiceInput.choice,
        question: newQuestion,
      });
    });
    await this.choiceRepository.save(newChoices);

    const savedQuestion = await this.questionRepository.findOne({
      where: { id: newQuestion.id },
      relations: ['user', 'choices'],
    });

    return savedQuestion as QuestionModel;
  }
}
