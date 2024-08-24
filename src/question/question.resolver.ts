import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { QuestionModel } from './models/question.model';
import { CreateQuestionInput } from './dto/createQuestion.Input.dto';
import { CreateAnswerChoiceInput } from '../answerChoice/dto/createAnswerChoice.Input.dto';

@Resolver()
export class QuestionResolver {
  constructor(private readonly questionnaireService: QuestionService) {}

  @Query(() => [QuestionModel])
  async getAllQuestions(): Promise<QuestionModel[]> {
    return this.questionnaireService.getAllQuestions();
  }

  @Mutation(() => QuestionModel)
  async createQuestion(
    @Args('createQuestionnaireInput')
    createQuestionnaireInput: CreateQuestionInput,
  ): Promise<QuestionModel> {
    return await this.questionnaireService.createQuestion(
      createQuestionnaireInput,
    );
  }

  @Mutation(() => QuestionModel)
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
