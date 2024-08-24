import { Field, InputType } from '@nestjs/graphql';
import { AnswerFormat } from '../enums/question.enum';

@InputType()
export class CreateQuestionInput {
  @Field()
  title: string;

  @Field()
  answerFormat: AnswerFormat;

  // @Field(() => Int)
  // userId: number;
}
