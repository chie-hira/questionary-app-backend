import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRespondentInput } from 'src/respondent/dto/create.respondent.input.dto';
import { AnswerResultService } from './answer-result.service';
import { AnswerResultModel } from './models/answerResult.model';
import { CreateAnswerResultInput } from './dto/create.answerResult.input.dto';
import { CreateAnswerDetailInput } from 'src/answer-detail/dto/create.answerDetail.input.dto';

@Resolver()
export class AnswerResultResolver {
  constructor(private readonly answerResultService: AnswerResultService) {}

  @Query(() => Int)
  async countAnswerRespondentsByQuestionId(
    @Args('questionId', { type: () => Int }) questionId: number,
  ): Promise<number> {
    return this.answerResultService.countAnswerRespondentsByQuestionId(
      questionId,
    );
  }

  @Query(() => [AnswerResultModel])
  async getDescriptionAnswersByQuestionId(
    @Args('questionId', { type: () => Int }) questionId: number,
  ): Promise<AnswerResultModel[]> {
    return this.answerResultService.getDescriptionAnswersByQuestionId(
      questionId,
    );
  }

  @Mutation(() => AnswerResultModel)
  async createAnswerWithRespondent(
    @Args('createAnswerResultInput')
    createAnswerResultInput: CreateAnswerResultInput,
    @Args({
      name: 'createAnswerDetailsInput',
      type: () => [CreateAnswerDetailInput],
    })
    createAnswerDetailsInput: CreateAnswerDetailInput[],
    @Args('createRespondentInput')
    createRespondentInput: CreateRespondentInput,
  ): Promise<AnswerResultModel> {
    return this.answerResultService.createAnswerWithRespondent(
      createAnswerResultInput,
      createAnswerDetailsInput,
      createRespondentInput,
    );
  }
}
