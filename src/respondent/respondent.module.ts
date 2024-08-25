import { Module } from '@nestjs/common';
import { RespondentService } from './respondent.service';
import { RespondentResolver } from './respondent.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Respondent } from './entities/respondent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Respondent])],
  providers: [RespondentService, RespondentResolver],
})
export class RespondentModule {}
