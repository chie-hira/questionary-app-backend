import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnswerChoiceModel } from '../../answer-choice/models/answerChoice.model';
import { AnswerResultModel } from '../../answer-result/models/answerResult.model';

@ObjectType()
export class AnswerDetailModel {
  @Field(() => Int)
  id: number;

  @Field(() => AnswerResultModel)
  answerResult: AnswerResultModel;

  @Field(() => AnswerChoiceModel)
  answerChoice: AnswerChoiceModel;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
