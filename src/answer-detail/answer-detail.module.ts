import { Module } from '@nestjs/common';
import { AnswerDetailService } from './answer-detail.service';
import { AnswerDetailResolver } from './answer-detail.resolver';

@Module({
  providers: [AnswerDetailService, AnswerDetailResolver],
})
export class AnswerDetailModule {}
