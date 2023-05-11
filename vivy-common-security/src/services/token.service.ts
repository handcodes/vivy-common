import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Redis, InjectRedis } from '@nestjs-modules/ioredis'
import { randomUUID } from 'crypto'
import { Request } from 'express'
import {
  IpUtils,
  CacheConstants,
  SecurityConstants,
  SecurityContextService,
  type IJwtToken,
  type ISysLoginUser,
} from '@vivy-cloud/common-core'

/**
 * 令牌验证处理
 */
@Injectable()
export class TokenService {
  constructor(
    @InjectRedis()
    private redis: Redis,
    private jwtService: JwtService,
    private securityContextService: SecurityContextService
  ) {}

  private MILLIS_SECOND = 1000

  private MILLIS_MINUTE = 60 * this.MILLIS_SECOND

  private MILLIS_MINUTE_REFRESH = CacheConstants.REFRESH_TIME * this.MILLIS_MINUTE

  /**
   * 获取令牌
   */
  getToken(req?: Request): string {
    return this.securityContextService.getToken(req)
  }

  /**
   * 获取令牌缓存 key
   */
  getTokenKey(key: string): string {
    return CacheConstants.LOGIN_TOKEN_KEY + key
  }

  /**
   * 解析令牌
   */
  parseToken(token: string): IJwtToken | null {
    if (!token) return null
    try {
      return this.jwtService.verify(token)
    } catch (error) {
      return null
    }
  }

  /**
   * 创建令牌
   */
  async createToken(loginUser: ISysLoginUser) {
    const userKey = randomUUID()
    const userId = loginUser.sysUser.userId
    const userName = loginUser.sysUser.userName
    loginUser.userKey = userKey
    loginUser.userId = userId
    loginUser.userName = userName
    loginUser.ipaddr = IpUtils.requestIp(this.securityContextService.getRequest())
    await this.setLoginUser(loginUser)

    // Jwt存储信息
    const payload = {
      [SecurityConstants.USER_KEY]: userKey,
      [SecurityConstants.USER_ID]: userId,
      [SecurityConstants.USER_NAME]: userName,
    }

    // 接口返回信息
    const result = {
      expires_in: CacheConstants.EXPIRATION,
      access_token: this.jwtService.sign(payload),
    }

    return result
  }

  /**
   * 获取用户会话key
   */
  getUserKey(payload: IJwtToken): string {
    return payload[SecurityConstants.USER_KEY]
  }

  /**
   * 获取用户ID
   */
  getUserId(payload: IJwtToken): number {
    return payload[SecurityConstants.USER_ID]
  }

  /**
   * 获取用户名称
   */
  getUserName(payload: IJwtToken): string {
    return payload[SecurityConstants.USER_NAME]
  }

  /**
   * 设置用户身份信息
   */
  async setLoginUser(loginUser: ISysLoginUser) {
    return this.refreshToken(loginUser)
  }

  /**
   * 获取用户身份信息
   */
  async getLoginUser(token: string): Promise<ISysLoginUser | null> {
    if (!token) return null
    try {
      const key = this.getTokenKey(this.getUserKey(this.parseToken(token)))
      const user = await this.redis.get(key)
      return JSON.parse(user)
    } catch (error) {
      return null
    }
  }

  /**
   * 删除用户缓存信息
   */
  async delLoginUser(token: string) {
    if (!token) return
    try {
      const key = this.getTokenKey(this.getUserKey(this.parseToken(token)))
      await this.redis.del(key)
    } catch (error) {}
  }

  /**
   * 是否存在用户缓存信息
   */
  async hasLoginUser(token: string): Promise<boolean> {
    if (!token) return false
    try {
      const key = this.getTokenKey(this.getUserKey(this.parseToken(token)))
      return !!(await this.redis.get(key))
    } catch (error) {
      return false
    }
  }

  /**
   * 验证令牌有效期，相差不足120分钟，自动刷新缓存
   */
  async verifyTokenExpire(loginUser: ISysLoginUser) {
    const expireTime = loginUser.expireTime
    const currentTime = Date.now()
    if (expireTime - currentTime <= this.MILLIS_MINUTE_REFRESH) {
      await this.refreshToken(loginUser)
    }
  }

  /**
   * 刷新令牌有效期
   */
  async refreshToken(loginUser: ISysLoginUser) {
    loginUser.loginTime = Date.now()
    loginUser.expireTime = loginUser.loginTime + CacheConstants.EXPIRATION * this.MILLIS_MINUTE

    const key = this.getTokenKey(loginUser.userKey)
    const user = JSON.stringify(loginUser)
    await this.redis.set(key, user, 'EX', CacheConstants.EXPIRATION * 60)
  }
}
