import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnswerChoiceModel } from 'src/answerChoice/models/answerChoice.model';
import { QuestionModel } from 'src/question/models/question.model';
import { RespondentModel } from 'src/respondent/models/respondent.model';

@ObjectType()
export class AnswerModel {
  @Field(() => Int)
  id: number;

  @Field(() => QuestionModel)
  question: QuestionModel;

  @Field(() => AnswerChoiceModel)
  choice: AnswerChoiceModel;

  @Field()
  description: string;

  @Field(() => RespondentModel)
  respondent: RespondentModel;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
