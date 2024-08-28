import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AggregatedAnswerModel {
  @Field(() => Int)
  questionId?: number;

  @Field()
  question?: string;

  @Field(() => Int)
  choiceId?: number;

  @Field()
  choice?: string;

  @Field(() => Int)
  count?: number;
}
