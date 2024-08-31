import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnswerResultModel } from '../../answer-result/models/answerResult.model';

@ObjectType()
export class RespondentModel {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
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
