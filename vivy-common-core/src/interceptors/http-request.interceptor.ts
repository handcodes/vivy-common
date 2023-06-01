import { Injectable } from '@nestjs/common'
import { HttpInterceptor, RegisterInterceptor, InternalAxiosRequestConfig } from '@nest-micro/http'
import { RequestContextService } from '../services/request-context.service'
import { SecurityConstants } from '../constants/security.constants'

/**
 * @nest-micro/http 请求拦截器，传递用户请求头信息。
 */
@Injectable()
@RegisterInterceptor()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private requestContextService: RequestContextService) {}

  onRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const request = this.requestContextService.getRequest()

    config.headers['X-Forwarded-For'] = request.get('X-Forwarded-For')
    config.headers[SecurityConstants.USER_SK] = request.get(SecurityConstants.USER_SK)
    config.headers[SecurityConstants.USER_ID] = request.get(SecurityConstants.USER_ID)
    config.headers[SecurityConstants.USER_NAME] = request.get(SecurityConstants.USER_NAME)
    config.headers[SecurityConstants.AUTHENTICATION] = request.get(SecurityConstants.AUTHENTICATION)

    return config
  }
}
