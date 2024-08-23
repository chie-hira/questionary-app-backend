import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionnaireResolver } from './questionnaire.resolver';
import { QuestionnaireService } from './questionnaire.service';
import { Questionnaire } from './entities/questionnaire.entity';
import { Choice } from 'src/choice/entities/choice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Questionnaire]),
    TypeOrmModule.forFeature([Choice]),
  ],
  providers: [QuestionnaireResolver, QuestionnaireService],
})
export class QuestionnaireModule {}
