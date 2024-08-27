import { Field, Int, ObjectType } from '@nestjs/graphql';
import { QuestionModel } from '../../question/models/question.model';
import { AnswerDetailModel } from 'src/answer-detail/models/answerDetail.model';

@ObjectType()
export class AnswerChoiceModel {
  @Field(() => Int)
  id: number;

  @Field()
  answerChoice: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => QuestionModel)
  question: QuestionModel;

  @Field(() => [AnswerDetailModel])
  answerDetails: AnswerDetailModel[];
}
