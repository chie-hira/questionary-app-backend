import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnswerModel } from 'src/answer/models/answer.model';

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

  @Field(() => [AnswerModel])
  answers: AnswerModel[];
}
