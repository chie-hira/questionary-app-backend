import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { QuestionModel } from './models/question.model';
import { CreateQuestionInput } from './dto/createQuestion.Input.dto';
import { CreateAnswerChoiceInput } from '../answerChoice/dto/createAnswerChoice.Input.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver()
export class QuestionResolver {
  constructor(private readonly questionnaireService: QuestionService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [QuestionModel])
  async getAllQuestions(): Promise<QuestionModel[]> {
    return this.questionnaireService.getAllQuestions();
  }

  @Mutation(() => QuestionModel)
  @UseGuards(JwtAuthGuard)
  async createQuestionWithAnswerChoices(
    @Args('createQuestionInput')
    createQuestionInput: CreateQuestionInput,
    @Args({
      name: 'createAnswerChoicesInput',
      type: () => [CreateAnswerChoiceInput],
    })
    createAnswerChoicesInput: CreateAnswerChoiceInput[],
  ): Promise<QuestionModel> {
    return this.questionnaireService.createQuestionWithAnswerChoices(
      createQuestionInput,
      createAnswerChoicesInput,
    );
  }
}
