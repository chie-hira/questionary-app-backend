import { Module } from '@nestjs/common';
import { QuestionnaireResolver } from './questionnaire.resolver';
import { QuestionnaireService } from './questionnaire.service';

@Module({
  providers: [QuestionnaireResolver, QuestionnaireService]
})
export class QuestionnaireModule {}
