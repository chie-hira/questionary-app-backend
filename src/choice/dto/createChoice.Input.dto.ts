import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateChoiceInput {
  @Field()
  choice: string;

  @Field(() => Int)
  questionnaireId: number;
}
