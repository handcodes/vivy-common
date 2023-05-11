import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { SecurityConstants } from '../constants/security.constants'
import { ISysLoginUser } from '../interfaces/sys-login-user.interface'

/**
 * 用户信息参数装饰器
 */
export const User = createParamDecorator<keyof ISysLoginUser>((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>()
  const user = request[SecurityConstants.LOGIN_USER]
  return data ? user && user[data] : user
})
