import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnswerFormat } from '../enums/question.enum';
import { AnswerChoiceModel } from '../../answerChoice/models/answerChoice.model';

@ObjectType()
export class QuestionModel {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  answerFormat: AnswerFormat;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [AnswerChoiceModel])
  choices: AnswerChoiceModel[];

  // @Field(() => UserModel)
  // user: UserModel;
}
