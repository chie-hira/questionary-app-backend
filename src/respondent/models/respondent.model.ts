import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnswerResultModel } from 'src/answer-result/models/answerResult.model';

@ObjectType()
export class RespondentModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [AnswerResultModel])
  answers: AnswerResultModel[];
}
