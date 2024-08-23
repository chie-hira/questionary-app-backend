import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AnswerFormat } from '../enums/questionnaire.enum';
import { ChoiceModel } from 'src/choice/models/choice.model';

@ObjectType()
export class QuestionnaireModel {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  answerFormat: AnswerFormat;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [ChoiceModel])
  choices: ChoiceModel[];

  // @Field(() => UserModel)
  // user: UserModel;
}
