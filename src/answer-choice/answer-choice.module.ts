import { Module } from '@nestjs/common';
import { AnswerChoiceResolver } from './answer-choice.resolver';
import { AnswerChoiceService } from './answer-choice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerChoice } from './entities/answerChoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerChoice])],
  providers: [AnswerChoiceResolver, AnswerChoiceService],
})
export class AnswerChoiceModule {}
