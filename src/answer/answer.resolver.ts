import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { AnswerModel } from './models/answer.model';
import { CreateAnswerInput } from './dto/create.answer.input.dto';
import { CreateRespondentInput } from 'src/respondent/dto/create.respondent.input.dto';

@Resolver()
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

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
