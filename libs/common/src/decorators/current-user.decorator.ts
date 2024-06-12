import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from '../../../../apps/auth/src/users/models/user.schema';

const getCurrentUserByContext = (context: ExecutionContext): UserDocument =>
  context.switchToHttp().getRequest().user;

export const CurrentUser = createParamDecorator(
  (_date: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
