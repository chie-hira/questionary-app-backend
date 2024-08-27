import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionResolver } from './question.resolver';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { AnswerChoice } from '../answer-choice/entities/answerChoice.entity';
import { User } from 'src/user/entities/user.entity';
import { AnswerResult } from 'src/answer-result/entities/answerResult.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([AnswerChoice]),
    TypeOrmModule.forFeature([AnswerResult]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [QuestionResolver, QuestionService],
})
export class QuestionModule {}
