import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionResolver } from './question.resolver';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { AnswerChoice } from '../answerChoice/entities/answerChoice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([AnswerChoice]),
  ],
  providers: [QuestionResolver, QuestionService],
})
export class QuestionnaireModule {}
