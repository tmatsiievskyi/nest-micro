import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from './users/models/user.schema';

const getCurrentUserByContext = (context: ExecutionContext): UserDocument =>
  context.switchToHttp().getRequest().user;

export const CurrentUser = createParamDecorator(
  (_date: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
