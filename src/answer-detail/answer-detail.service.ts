import { Injectable } from '@nestjs/common';
import { AnswerDetail } from './entities/answerDetail.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerDetailModel } from './models/answerDetail.model';
import { AggregatedAnswerModel } from './models/aggregatedAnswer.model';
import { AnswerChoice } from 'src/answer-choice/entities/answerChoice.entity';

@Injectable()
export class AnswerDetailService {
  constructor(
    @InjectRepository(AnswerDetail)
    private readonly answerDetailRepository: Repository<AnswerDetail>,
    @InjectRepository(AnswerChoice)
    private readonly answerChoiceRepository: Repository<AnswerChoice>,
  ) {}

  async getAggregatedAnswerByQuestionId(
    questionId: number,
  ): Promise<AggregatedAnswerModel[]> {
    const answerDetails = await this.answerDetailRepository.find({
      relations: ['answerResult', 'answerResult.question', 'answerChoice'],
      where: { answerResult: { question: { id: questionId } } },
    });
    const answerChoices = await this.answerChoiceRepository.find({
      relations: ['question'],
      where: { question: { id: questionId } },
    });

    const aggregatedAnswer = this.aggregateAnswerDetails(
      answerDetails,
      answerChoices,
    );

    return aggregatedAnswer;
  }

  private aggregateAnswerDetails(
    answerDetails: AnswerDetailModel[],
    answerChoices: AnswerChoice[],
  ): AggregatedAnswerModel[] {
    const aggregatedAnswerList: AggregatedAnswerModel[] = answerChoices.map(
      (answerChoice) => ({
        questionId: answerChoice.question.id,
        question: answerChoice.question.question,
        choiceId: answerChoice.id,
        choice: answerChoice.answerChoice,
        count: 0,
      }),
    );

    for (const answerDetail of answerDetails) {
      const aggregatedAnswer = aggregatedAnswerList.find(
        (a) => a.choiceId === answerDetail.answerChoice.id,
      );

      if (aggregatedAnswer) {
        aggregatedAnswer.count += 1;
      }
    }

    return aggregatedAnswerList.sort((a, b) => a.choiceId - b.choiceId);
  }
}
