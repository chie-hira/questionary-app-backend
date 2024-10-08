import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { QuestionModel } from './models/question.model';
import { CreateQuestionInput } from './dto/createQuestion.input.dto';
import { CreateAnswerChoiceInput } from '../answer-choice/dto/createAnswerChoice.input.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Resolver()
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Query(() => [QuestionModel])
  async getAllQuestions(): Promise<QuestionModel[]> {
    return this.questionService.getAllQuestions();
  }

  @Query(() => [QuestionModel])
  @UseGuards(JwtAuthGuard)
  async getQuestionsByUser(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<QuestionModel[]> {
    return this.questionService.getQuestionsByUser(userId);
  }

  @Query(() => QuestionModel)
  async getQuestionById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<QuestionModel> {
    return this.questionService.getQuestionById(id);
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
    return this.questionService.createQuestionWithAnswerChoices(
      createQuestionInput,
      createAnswerChoicesInput,
    );
  }

  @Mutation(() => QuestionModel)
  @UseGuards(JwtAuthGuard)
  async deleteQuestion(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<QuestionModel> {
    return this.questionService.deleteQuestion(id);
  }
}
