import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

// オーバーライドしてgql用,LocalStrategy用(emailとpasswordで認証する)のAuthGuardを作成
@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext(); // request情報を取得
    request.body = ctx.getArgs().loginInput; // loginInputを取得
    return request;
  }
}
