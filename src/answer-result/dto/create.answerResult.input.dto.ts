import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateAnswerResultInput {
  @Field(() => Int)
  @IsNotEmpty()
  questionId: number;

  @Field({ nullable: true })
  @MaxLength(200)
  description?: string;
}
