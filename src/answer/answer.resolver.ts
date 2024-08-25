import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { AnswerModel } from './models/answer.model';
import { CreateAnswerInput } from './dto/create.answer.input.dto';
import { CreateRespondentInput } from 'src/respondent/dto/create.respondent.input.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver()
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Query(() => [AnswerModel])
  @UseGuards(JwtAuthGuard)
  async getAnswersByUser(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<AnswerModel[]> {
    return this.answerService.getAnswersByUser(userId);
  }

  @Mutation(() => AnswerModel)
  async createAnswerWithRespondent(
    @Args('createAnswerInput')
    createAnswerInput: CreateAnswerInput,
    @Args('createRespondentInput')
    createRespondentInput: CreateRespondentInput,
  ): Promise<AnswerModel> {
    return this.answerService.createAnswerWithRespondent(
      createAnswerInput,
      createRespondentInput,
    );
  }
}
