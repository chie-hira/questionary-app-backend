import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnswerFormat } from '../enums/question.enum';
import { AnswerChoiceModel } from '../../answerChoice/models/answerChoice.model';
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
  choices: AnswerChoiceModel[];

  @Field(() => UserModel)
  user: UserModel;
}
