import { Reflector } from '@nestjs/core'
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { SecurityConstants, NotInnerException } from '@vivy-cloud/common-core'
import { Express } from 'express'
import { INNER_AUTH_METADATA } from '../security.constants'

/**
 * 内部认证守卫
 */
@Injectable()
export class InnerAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp()
    const request = ctx.getRequest<Express>()
    const innerAuth = this.reflector.get<{ isUser: boolean }>(INNER_AUTH_METADATA, context.getHandler())
    if (!innerAuth) return true

    // 内部请求验证
    const source = request.get(SecurityConstants.FROM_SOURCE)
    if (source !== SecurityConstants.SOURCE_INNER) {
      throw new NotInnerException('没有内部访问权限，不允许访问')
    }

    // 用户信息验证
    const userId = request.get(SecurityConstants.USER_ID)
    const userName = request.get(SecurityConstants.USER_NAME)
    if (innerAuth.isUser && (!userId || !userName)) {
      throw new NotInnerException('没有设置用户信息，不允许访问')
    }

    return true
  }
}
