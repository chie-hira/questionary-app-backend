import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateAnswerInput {
  @Field(() => Int)
  @IsNotEmpty()
  questionId: number;

  @Field(() => Int, { nullable: true })
  answerChoiceId?: number;

  @Field({ nullable: true })
  description?: string;
}
