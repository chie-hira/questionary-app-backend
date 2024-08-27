import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAnswerDetailInput {
  @Field(() => Int)
  answerChoiceId: number;
}
