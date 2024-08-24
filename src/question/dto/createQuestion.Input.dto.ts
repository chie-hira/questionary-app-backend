import { Field, InputType, Int } from '@nestjs/graphql';
import { AnswerFormat } from '../enums/question.enum';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateQuestionInput {
  @Field()
  @IsNotEmpty()
  question: string;

  @Field()
  @IsNotEmpty()
  answerFormat: AnswerFormat;

  @Field(() => Int)
  userId: number;
}
