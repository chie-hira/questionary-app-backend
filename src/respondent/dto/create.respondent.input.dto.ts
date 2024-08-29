import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateRespondentInput {
  @Field()
  name: string;

  @Field()
  @IsEmail()
  email: string;
}
