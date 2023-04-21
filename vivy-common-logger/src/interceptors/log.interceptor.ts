import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable, tap, catchError, throwError } from 'rxjs'
import { isObject } from 'lodash'
import { Request } from 'express'
import { IpUtils } from '@vivy-cloud/common-core'
import { RemoteLogService, OperLogDto } from '@vivy-cloud/remote-api'
import { LOGGER_LOG_METADATA } from '../logger.constants'
import { LoggerLogMetaData } from '../logger.interface'
import { OperatorStatus } from '../enums/business-status.enum'

@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector, private remoteLogService: RemoteLogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const meta = this.reflector.get<LoggerLogMetaData>(LOGGER_LOG_METADATA, context.getHandler())
    if (!meta) return next.handle()

    const ctx = context.switchToHttp()
    const request = ctx.getRequest<Request>()
    const operLog = new OperLogDto()

    operLog.title = meta.title
    operLog.businessType = meta.businessType
    operLog.operType = meta.operatorType
    operLog.operMethod = `${context.getClass().name}.${context.getHandler().name}`

    const region = IpUtils.ip2Region(IpUtils.requestIp(request))
    operLog.operIp = IpUtils.requestIp(request)
    operLog.operLocation = `${region.country} ${region.province} ${region.city} ${region.isp}`
    operLog.operName = '...todo...'

    operLog.requestUrl = request.url
    operLog.requestMethod = request.method
    operLog.requestParam = JSON.stringify(request.body)

    return next.handle().pipe(
      tap((res) => {
        operLog.operStatus = OperatorStatus.SUCCESS
        operLog.requestResult = isObject(res) ? JSON.stringify(res) : res
        this.remoteLogService.saveOperLog(operLog)
      }),
      catchError((err: Error) => {
        operLog.operStatus = OperatorStatus.FAIL
        operLog.requestErrmsg = isObject(err.message) ? JSON.stringify(err.message) : err.message
        this.remoteLogService.saveOperLog(operLog)
        return throwError(() => err)
      })
    )
  }
}
