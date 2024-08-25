import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionResolver } from './question.resolver';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { AnswerChoice } from '../answerChoice/entities/answerChoice.entity';
import { User } from 'src/user/entities/user.entity';
import { Answer } from 'src/answer/entities/answer.entity';
// import { DataSource } from 'typeorm';
// import { AppDataSource } from 'src/data-source';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    TypeOrmModule.forFeature([AnswerChoice]),
    TypeOrmModule.forFeature([Answer]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [QuestionResolver, QuestionService],
  // providers: [
  //   QuestionResolver,
  //   QuestionService,
  //   {
  //     provide: DataSource,
  //     useFactory: async () => {
  //       if (!AppDataSource.isInitialized) {
  //         await AppDataSource.initialize();
  //       }
  //       return AppDataSource;
  //     },
  //   },
  // ],
})
export class QuestionModule {}
