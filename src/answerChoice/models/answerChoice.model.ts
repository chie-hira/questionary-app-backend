import { Field, Int, ObjectType } from '@nestjs/graphql';
import { QuestionModel } from '../../question/models/question.model';

@ObjectType()
export class AnswerChoiceModel {
  @Field(() => Int)
  id: number;

  @Field()
  choice: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => QuestionModel)
  questionnaire: QuestionModel;
}
