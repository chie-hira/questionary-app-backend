import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Respondent } from 'src/respondent/entities/respondent.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { CreateAnswerInput } from './dto/create.answer.input.dto';
import { CreateRespondentInput } from 'src/respondent/dto/create.respondent.input.dto';
import { AnswerModel } from './models/answer.model';
import { Answer } from './entities/answer.entity';
import { AnswerChoice } from 'src/answerChoice/entities/answerChoice.entity';
import { Question } from 'src/question/entities/question.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<AnswerModel>,
    @InjectRepository(Respondent)
    private readonly respondentRepository: Repository<Respondent>,
    private readonly dataSource: DataSource,
  ) {}

  async createAnswerWithRespondent(
    createAnswerInput: CreateAnswerInput,
    createRespondentInput: CreateRespondentInput,
  ): Promise<AnswerModel> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const { name, email } = createRespondentInput;
    const { questionId, answerChoiceId, description } = createAnswerInput;

    try {
      let respondent = await this.respondentRepository.findOne({
        where: { email },
      });

      if (!respondent) {
        respondent = await this.respondentRepository.create({
          name,
          email,
        });
        await queryRunner.manager.save(respondent);
      }

      const existingAnswer = await this.answerRepository.findOne({
        where: {
          question: { id: questionId },
          respondent,
        },
      });

      if (existingAnswer) {
        throw new Error(
          'An answer for this question by this respondent already exists.',
        );
      }

      const newAnswer = await this.answerRepository.create({
        question: { id: questionId } as Question,
        answerChoice: { id: answerChoiceId } as AnswerChoice,
        description,
        respondent,
      });
      await queryRunner.manager.save(newAnswer);
      await queryRunner.commitTransaction();

      const savedAnswer = await this.answerRepository.findOne({
        where: { id: newAnswer.id },
        relations: ['question', 'answerChoice', 'respondent'],
      });

      return savedAnswer as AnswerModel;
    } catch (error: unknown) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
