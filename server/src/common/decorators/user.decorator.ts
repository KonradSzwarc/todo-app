import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestUser } from '../typings/RequestUser';

type UserKey = keyof RequestUser;

export const User = createParamDecorator((data: UserKey, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user: RequestUser = request.user;

  return data ? user && user[data] : user;
});
