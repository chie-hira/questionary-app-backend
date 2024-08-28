import { Injectable } from '@nestjs/common';
import { AnswerDetail } from './entities/answerDetail.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerDetailModel } from './models/answerDetail.model';
import { AggregatedAnswerModel } from './models/aggregatedAnswer.model';

@Injectable()
export class AnswerDetailService {
  constructor(
    @InjectRepository(AnswerDetail)
    private readonly answerDetailRepository: Repository<AnswerDetail>,
  ) {}

  async getAnswerDetailsByQuestionId(
    questionId: number,
  ): Promise<AnswerDetailModel[]> {
    return await this.answerDetailRepository.find({
      relations: ['question', 'answerChoice'],
      where: { question: { id: questionId } },
    });
  }

  async getAggregatedAnswerByQuestionId(
    questionId: number,
  ): Promise<AggregatedAnswerModel[]> {
    const answerDetails = await this.answerDetailRepository.find({
      relations: ['question', 'answerChoice'],
      where: { question: { id: questionId } },
    });

    const aggregatedAnswer = this.aggregateAnswerDetails(answerDetails);

    return aggregatedAnswer;
  }

  private aggregateAnswerDetails(
    answerDetails: AnswerDetailModel[],
  ): AggregatedAnswerModel[] {
    const aggregatedAnswerList: AggregatedAnswerModel[] = [];
    for (const answerDetail of answerDetails) {
      let aggregatedAnswer = aggregatedAnswerList.find(
        (a) => a.choiceId === answerDetail.answerChoice.id,
      );

      if (!aggregatedAnswer) {
        aggregatedAnswer = {
          questionId: answerDetail.question.id,
          question: answerDetail.question.question,
          choiceId: answerDetail.answerChoice.id,
          choice: answerDetail.answerChoice.answerChoice,
          count: 1,
        };
        aggregatedAnswerList.push(aggregatedAnswer);
      } else {
        aggregatedAnswer.count += 1;
      }
    }

    return aggregatedAnswerList.sort((a, b) => b.count - a.count);
  }
}
