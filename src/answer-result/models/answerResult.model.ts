import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnswerDetailModel } from 'src/answer-detail/models/answerDetail.model';
// import { AnswerChoiceModel } from 'src/answerChoice/models/answerChoice.model';
import { QuestionModel } from 'src/question/models/question.model';
import { RespondentModel } from 'src/respondent/models/respondent.model';

@ObjectType()
export class AnswerResultModel {
  @Field(() => Int)
  id: number;

  @Field(() => QuestionModel)
  question: QuestionModel;

  @Field(() => [AnswerDetailModel], { nullable: true })
  answerDetails: AnswerDetailModel[];

  @Field({ nullable: true })
  description: string;

  @Field(() => RespondentModel)
  respondent: RespondentModel;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
