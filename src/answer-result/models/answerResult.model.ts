import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnswerDetailModel } from '../../answer-detail/models/answerDetail.model';
import { QuestionModel } from '../../question/models/question.model';
import { RespondentModel } from '../../respondent/models/respondent.model';

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
