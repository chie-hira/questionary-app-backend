import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Respondent } from 'src/respondent/entities/respondent.entity';
import { DataSource, IsNull, Not, QueryRunner, Repository } from 'typeorm';
import { CreateRespondentInput } from 'src/respondent/dto/create.respondent.input.dto';
import { Question } from 'src/question/entities/question.entity';
import { AnswerResult } from './entities/answerResult.entity';
import { AnswerResultModel } from './models/answerResult.model';
import { CreateAnswerResultInput } from './dto/create.answerResult.input.dto';
import { CreateAnswerDetailInput } from 'src/answer-detail/dto/create.answerDetail.input.dto';
import { AnswerChoice } from 'src/answer-choice/entities/answerChoice.entity';
import { AnswerDetail } from 'src/answer-detail/entities/answerDetail.entity';

@Injectable()
export class AnswerResultService {
  constructor(
    @InjectRepository(AnswerResult)
    private readonly answerResultRepository: Repository<AnswerResult>,
    @InjectRepository(AnswerDetail)
    private readonly answerDetailRepository: Repository<AnswerDetail>,
    @InjectRepository(Respondent)
    private readonly respondentRepository: Repository<Respondent>,
    private readonly dataSource: DataSource,
  ) {}

  async getAnswersByUser(userId: number): Promise<AnswerResultModel[]> {
    return await this.answerResultRepository.find({
      relations: [
        'question',
        'question.user',
        'respondent',
        'answerDetails',
        'answerDetails.answerChoice',
      ],
      where: {
        question: {
          user: {
            id: userId,
          },
        },
      },
    });
  }

  async getDescriptionAnswersByQuestionId(
    questionId: number,
  ): Promise<AnswerResultModel[]> {
    return await this.answerResultRepository.find({
      relations: ['question', 'respondent'],
      where: {
        question: {
          id: questionId,
        },
        description: Not(IsNull()) || Not(''),
      },
    });
  }

  async createAnswerWithRespondent(
    createAnswerResultInput: CreateAnswerResultInput,
    createAnswerDetailsInput: CreateAnswerDetailInput[],
    createRespondentInput: CreateRespondentInput,
  ): Promise<AnswerResultModel> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const { name, email } = createRespondentInput;
    const { questionId, description } = createAnswerResultInput;

    try {
      const question = await queryRunner.manager.findOne(Question, {
        where: { id: questionId },
      });

      if (!question) {
        throw new Error('Question not found');
      }

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

      const existingAnswer = await this.answerResultRepository.findOne({
        where: {
          question,
          respondent,
        },
      });

      if (existingAnswer) {
        throw new Error(
          'An answer for this question by this respondent already exists.',
        );
      }

      const newAnswer = await this.answerResultRepository.create({
        question,
        description,
        respondent,
      });
      await queryRunner.manager.save(newAnswer);

      for (const answerDetailInput of createAnswerDetailsInput) {
        const answerChoiceId = answerDetailInput.answerChoiceId;

        const answerChoice = await queryRunner.manager.findOne(AnswerChoice, {
          where: { id: answerChoiceId },
        });

        if (!answerChoice) {
          throw new Error('AnswerChoice not found');
        }

        const newAnswerDetail = await this.answerDetailRepository.create({
          answerResult: newAnswer,
          answerChoice,
        });

        await queryRunner.manager.save(newAnswerDetail);
      }
      await queryRunner.commitTransaction();

      const savedAnswer = await this.answerResultRepository.findOne({
        where: { id: newAnswer.id },
        relations: [
          'question',
          'respondent',
          'answerDetails',
          'answerDetails.answerChoice',
        ],
      });

      return savedAnswer as AnswerResultModel;
    } catch (error: unknown) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
