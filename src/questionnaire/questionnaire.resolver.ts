import { Query, Resolver } from '@nestjs/graphql';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireModel } from './models/questionnaire.model';

@Resolver()
export class QuestionnaireResolver {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Query(() => [QuestionnaireModel])
  async getAllQuestionnaires(): Promise<QuestionnaireModel[]> {
    return this.questionnaireService.getAllQuestionnaires();
  }
}
