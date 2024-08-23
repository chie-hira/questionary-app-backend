import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnswerFormat } from '../enums/questionnaire.enum';

@ObjectType()
export class QuestionnaireModel {
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

  // @Field(() => UserModel)
  // user: UserModel;
}
