import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class GetUserArgs {
  @Field()
  @IsEmail()
  email: string;
}
