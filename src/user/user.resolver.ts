import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './models/user.model';
import { CreateUserInput } from './dto/createUser.Input.dto';
import { GetUserArgs } from './dto/getUser.input.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel, { nullable: true })
  async findOneByEmail(
    @Args('getUserArgs') getUserArgs: GetUserArgs,
  ): Promise<UserModel> {
    return await this.userService.findOneByEmail(getUserArgs.email);
  }

  @Mutation(() => UserModel)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserModel> {
    return await this.userService.createUser(createUserInput);
  }
}
