import { Field, Int, ObjectType } from '@nestjs/graphql';

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
}
