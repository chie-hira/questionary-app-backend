import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { AnswerDetailService } from './answer-detail.service';
import { AnswerDetailModel } from './models/answerDetail.model';
import { AggregatedAnswerModel } from './models/aggregatedAnswer.model';

@Resolver()
export class AnswerDetailResolver {
  constructor(private readonly answerDetailService: AnswerDetailService) {}

  @Query(() => [AnswerDetailModel])
  async getAnswerDetailsByQuestionId(
    @Args('questionId', { type: () => Int }) questionId: number,
  ): Promise<AnswerDetailModel[]> {
    return this.answerDetailService.getAnswerDetailsByQuestionId(questionId);
  }

  @Query(() => [AggregatedAnswerModel])
  async getAggregatedAnswerByQuestionId(
    @Args('questionId', { type: () => Int }) questionId: number,
  ): Promise<AggregatedAnswerModel[]> {
    return this.answerDetailService.getAggregatedAnswerByQuestionId(questionId);
  }
}
