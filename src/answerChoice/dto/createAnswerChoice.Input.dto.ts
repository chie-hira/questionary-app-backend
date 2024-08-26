import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateAnswerChoiceInput {
  @Field()
  @IsNotEmpty()
  answerChoice: string;
}
