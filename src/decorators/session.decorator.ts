import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const SessionDecorator = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.session) {
      if (filter) {
        return request.session[filter];
      }
      return request.session;
    }

    throw new NotFoundException(
      'Session not found in request. Use the AuthGuard to get session',
    );
  },
);
