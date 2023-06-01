import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { SecurityConstants } from '@vivy-cloud/common-core'
import { TokenService } from '../services/token.service'

/**
 * 权限请求头中间件
 * 注意：此中间件会同时验证当前用户有效期自动刷新有效期
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private tokenService: TokenService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    // 登录信息附加到请求
    const userSk = request.get(SecurityConstants.USER_SK)
    if (userSk) request[SecurityConstants.USER_SK] = userSk

    const userId = request.get(SecurityConstants.USER_ID)
    if (userId) request[SecurityConstants.USER_ID] = Number(userId)

    const userName = request.get(SecurityConstants.USER_NAME)
    if (userName) request[SecurityConstants.USER_NAME] = userName

    // 用户信息附加到请求
    const token = this.tokenService.getToken(request)
    if (token) {
      const loginUser = await this.tokenService.getLoginUser(token)
      if (loginUser) {
        request[SecurityConstants.LOGIN_USER] = loginUser
        this.tokenService.verifyTokenExpire(loginUser)
      }
    }

    next()
  }
}
