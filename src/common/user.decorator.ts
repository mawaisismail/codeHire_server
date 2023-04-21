import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const token = GqlExecutionContext.create(ctx)
      .getContext()
      .req.headers.authorization.split(' ')[1];
    const jwtService = new JwtService();
    return jwtService.verify(token, { secret: 'JWT_SECRET' });
  },
);
