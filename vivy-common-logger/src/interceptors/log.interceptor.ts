import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Provider } from '@nestjs/common'
import { APP_INTERCEPTOR, Reflector } from '@nestjs/core'
import { Observable, tap } from 'rxjs'
import { Request } from 'express'
import { IpUtils } from '@vivy-cloud/common-core'
import { LOGGER_LOG_METADATA } from '../logger.constants'
import { LoggerLogMetaData } from '../logger.interface'

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const meta = this.reflector.get<LoggerLogMetaData>(LOGGER_LOG_METADATA, context.getHandler())
    if (!meta) return next.handle()

    console.log('日志信息', meta)
    console.log('方法信息', {
      className: context.getClass().name,
      handlerName: context.getHandler().name,
    })

    const ctx = context.switchToHttp()
    const request = ctx.getRequest<Request>()
    console.log('请求信息', {
      url: request.url,
      path: request.path,
      query: request.query,
      body: request.body,
      headers: request.headers,
      ip: IpUtils.requestIp(request),
      ipRegion: IpUtils.ip2Region(IpUtils.requestIp(request)),
    })

    return next.handle().pipe(
      tap((data) => {
        console.log('响应信息', data)
        console.log('保存为远程日志...')
      })
    )
  }
}

export const LogInterceptorProvide: Provider = {
  provide: APP_INTERCEPTOR,
  useClass: LogInterceptor,
}
