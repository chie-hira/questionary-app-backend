import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { AnswerDetailService } from './answer-detail.service';
import { AggregatedAnswerModel } from './models/aggregatedAnswer.model';

@Resolver()
export class AnswerDetailResolver {
  constructor(private readonly answerDetailService: AnswerDetailService) {}

  @Query(() => [AggregatedAnswerModel])
  async getAggregatedAnswerByQuestionId(
    @Args('questionId', { type: () => Int }) questionId: number,
  ): Promise<AggregatedAnswerModel[]> {
    return this.answerDetailService.getAggregatedAnswerByQuestionId(questionId);
  }
}
