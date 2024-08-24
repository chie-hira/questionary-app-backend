import { Module } from '@nestjs/common';
import { AnswerChoiceResolver } from './answerChoice.resolver';
import { AnswerChoiceService } from './answerChoice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerChoice } from './entities/answerChoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerChoice])],
  providers: [AnswerChoiceResolver, AnswerChoiceService],
})
export class ChoiceModule {}
