import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireModel } from './models/questionnaire.model';
import { CreateQuestionnaireInput } from './dto/createQuestionnaire.Input.dto';

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
}
