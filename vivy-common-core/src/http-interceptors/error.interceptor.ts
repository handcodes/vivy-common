import { Injectable } from '@nestjs/common'
import { HttpInterceptor, RegisterInterceptor, AxiosError } from '@nest-micro/http'
import { LoggerService } from '@vivy-cloud/common-logger'

/**
 * 错误请求拦截器
 */
@Injectable()
@RegisterInterceptor()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private logger: LoggerService) {}

  onRequestError(error: AxiosError): Promise<AxiosError> {
    this.logger.error(error.message, JSON.stringify(error.toJSON(), null, 2), ErrorInterceptor.name)
    return Promise.reject(error)
  }

  onResponseError(error: AxiosError): Promise<AxiosError> {
    this.logger.error(error.message, JSON.stringify(error.toJSON(), null, 2), ErrorInterceptor.name)
    return Promise.reject(error)
  }
}
