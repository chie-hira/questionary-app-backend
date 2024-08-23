import { Field, InputType } from '@nestjs/graphql';
import { AnswerFormat } from '../enums/questionnaire.enum';

@InputType()
export class CreateQuestionnaireInput {
  @Field()
  title: string;

  @Field()
  answerFormat: AnswerFormat;

  // @Field(() => Int)
  // userId: number;
}
