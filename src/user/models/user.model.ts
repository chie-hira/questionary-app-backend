import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';
import { QuestionModel } from 'src/question/models/question.model';

@ObjectType()
export class UserModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @HideField()
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [QuestionModel], { nullable: true })
  questions: QuestionModel[];
}
