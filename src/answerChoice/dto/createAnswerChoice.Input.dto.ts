import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAnswerChoiceInput {
  @Field()
  choice: string;

  @Field(() => Int)
  questionId: number;
}
