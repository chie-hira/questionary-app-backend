import { Field, Int, ObjectType } from '@nestjs/graphql';
import { QuestionnaireModel } from 'src/questionnaire/models/questionnaire.model';

@ObjectType()
export class ChoiceModel {
  @Field(() => Int)
  id: number;

  @Field()
  choice: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => QuestionnaireModel)
  questionnaire: QuestionnaireModel;
}
