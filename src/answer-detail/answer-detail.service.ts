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

  async getAggregatedAnswerByQuestionId(
    questionId: number,
  ): Promise<AggregatedAnswerModel[]> {
    const answerDetails = await this.answerDetailRepository.find({
      relations: ['answerResult', 'answerResult.question', 'answerChoice'],
      where: { answerResult: { question: { id: questionId } } },
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
          questionId: answerDetail.answerResult.question.id,
          question: answerDetail.answerResult.question.question,
          choiceId: answerDetail.answerChoice.id,
          choice: answerDetail.answerChoice.answerChoice,
          count: 1,
        };
        aggregatedAnswerList.push(aggregatedAnswer);
      } else {
        aggregatedAnswer.count += 1;
      }
    }

    return aggregatedAnswerList.sort((a, b) => a.choiceId - b.choiceId);
  }
}
