import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner, Repository } from 'typeorm';
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
    private readonly answerChoiceRepository: Repository<AnswerChoice>,
    private readonly dataSource: DataSource,
  ) {}

  async getAllQuestions(): Promise<QuestionModel[]> {
    return await this.questionRepository.find();
  }

  async getQuestionsByUser(userId: number): Promise<QuestionModel[]> {
    return await this.questionRepository.find({
      relations: ['user', 'answerChoices'],
      where: { user: { id: userId } },
    });
  }

  async getQuestionById(id: number): Promise<QuestionModel> {
    return await this.questionRepository.findOne({
      relations: ['answerChoices'],
      where: { id },
    });
  }

  async createQuestionWithAnswerChoices(
    createQuestionInput: CreateQuestionInput,
    createAnswerChoicesInput: CreateAnswerChoiceInput[],
  ): Promise<QuestionModel> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { question, answerFormat, userId } = createQuestionInput;

      const user = await queryRunner.manager.findOne(User, {
        where: { id: userId },
      });

      if (!user) {
        throw new Error('User not found');
      }

      const newQuestion = this.questionRepository.create({
        question,
        answerFormat,
        user,
      });
      await queryRunner.manager.save(newQuestion);

      const newAnswerChoices = createAnswerChoicesInput.map(
        (answerChoiceInput) => {
          return this.answerChoiceRepository.create({
            answerChoice: answerChoiceInput.answerChoice,
            question: newQuestion,
          });
        },
      );
      await queryRunner.manager.save(newAnswerChoices);

      await queryRunner.commitTransaction();

      const savedQuestion = await this.questionRepository.findOne({
        where: { id: newQuestion.id },
        relations: ['user', 'answerChoices'],
      });

      return savedQuestion as QuestionModel;
    } catch (error: unknown) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release(); // QueryRunnerを終了して解放
    }
  }
}
