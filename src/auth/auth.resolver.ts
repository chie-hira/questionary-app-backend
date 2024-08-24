import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/loginResponce';
import { LoginInput } from './dto/loginInput.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // ログインはデータの変更を伴わないが、副作用(サーバーのログイン状態の変更)があるためMutationを使う
  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  /**
   * 引数loginInputは見た目場、使用されたいないが、GqlAuthGuardでloginInputを取得し認証を確認、
   * 成功するとcontext.userにユーザー情報が格納される
   */
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context: any,
  ): Promise<LoginResponse> {
    return await this.authService.login(context.user);
  }
}
