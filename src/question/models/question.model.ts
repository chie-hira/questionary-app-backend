import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnswerFormat } from '../enums/question.enum';
import { AnswerChoiceModel } from '../../answer-choice/models/answerChoice.model';
import { AnswerResultModel } from 'src/answer-result/models/answerResult.model';
import { UserModel } from 'src/user/models/user.model';

@ObjectType()
export class QuestionModel {
  @Field(() => Int)
  id: number;

  @Field()
  question: string;

  @Field()
  answerFormat: AnswerFormat;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [AnswerChoiceModel])
  answerChoices: AnswerChoiceModel[];

  @Field(() => [AnswerResultModel])
  answerResults: AnswerResultModel[];

  @Field(() => UserModel)
  user: UserModel;
}
