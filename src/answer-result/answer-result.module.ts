import { Module } from '@nestjs/common';
import { AnswerResultResolver } from './answer-result.resolver';
import { AnswerResultService } from './answer-result.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerResult } from './entities/answerResult.entity';
import { Respondent } from 'src/respondent/entities/respondent.entity';
import { AnswerDetail } from 'src/answer-detail/entities/answerDetail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnswerResult]),
    TypeOrmModule.forFeature([AnswerDetail]),
    TypeOrmModule.forFeature([Respondent]),
  ],
  providers: [AnswerResultResolver, AnswerResultService],
})
export class AnswerResultModule {}
