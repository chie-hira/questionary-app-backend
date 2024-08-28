import { Module } from '@nestjs/common';
import { AnswerDetailService } from './answer-detail.service';
import { AnswerDetailResolver } from './answer-detail.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerDetail } from './entities/answerDetail.entity';
import { AnswerChoice } from 'src/answer-choice/entities/answerChoice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnswerDetail]),
    TypeOrmModule.forFeature([AnswerChoice]),
  ],
  providers: [AnswerDetailService, AnswerDetailResolver],
})
export class AnswerDetailModule {}
