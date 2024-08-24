import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateAnswerChoiceInput {
  @Field()
  @IsNotEmpty()
  choice: string;

  @Field(() => Int)
  questionId: number;
}
