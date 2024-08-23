import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireModel } from './models/questionnaire.model';
import { CreateQuestionnaireInput } from './dto/createQuestionnaire.Input.dto';
import { CreateChoiceInput } from 'src/choice/dto/createChoice.Input.dto';

@Resolver()
export class QuestionnaireResolver {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Query(() => [QuestionnaireModel])
  async getAllQuestionnaires(): Promise<QuestionnaireModel[]> {
    return this.questionnaireService.getAllQuestionnaires();
  }

  @Mutation(() => QuestionnaireModel)
  async createQuestionnaire(
    @Args('createQuestionnaireInput')
    createQuestionnaireInput: CreateQuestionnaireInput,
  ): Promise<QuestionnaireModel> {
    return await this.questionnaireService.createQuestionnaire(
      createQuestionnaireInput,
    );
  }

  @Mutation(() => QuestionnaireModel)
  async createQuestionnaireWithChoices(
    @Args('createQuestionnaireInput')
    createQuestionnaireInput: CreateQuestionnaireInput,
    @Args({ name: 'createChoicesInput', type: () => [CreateChoiceInput] })
    createChoicesInput: CreateChoiceInput[],
  ): Promise<QuestionnaireModel> {
    return this.questionnaireService.createQuestionnaireWithChoices(
      createQuestionnaireInput,
      createChoicesInput,
    );
  }
}
