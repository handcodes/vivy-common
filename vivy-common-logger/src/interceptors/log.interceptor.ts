import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable, tap, catchError, throwError } from 'rxjs'
import { isObject } from 'lodash'
import { Request } from 'express'
import { IpUtils } from '@vivy-cloud/common-core/lib/utils'
import { SecurityConstants } from '@vivy-cloud/common-core/lib/constants'
import { LOGGER_LOG_METADATA } from '../logger.constants'
import { LoggerLogMetaData } from '../logger.interface'
import { OperStatus } from '../enums/oper-status.enum'
import { RpcLogService } from '../services/rpc-log.service'
import { OperLogDto } from '../services/dto/oper-log.dto'

/**
 * 自定义操作日志记录拦截器
 */
@Injectable()
export class LogInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector, private rpcLogService: RpcLogService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const meta = this.reflector.get<LoggerLogMetaData>(LOGGER_LOG_METADATA, context.getHandler())
    if (!meta) return next.handle()

    const ctx = context.switchToHttp()
    const request = ctx.getRequest<Request>()
    const operLog = new OperLogDto()

    operLog.title = meta.title
    operLog.operType = meta.operType
    operLog.operMethod = `${context.getClass().name}.${context.getHandler().name}`

    const region = IpUtils.ip2Region(IpUtils.requestIp(request))
    operLog.operIp = IpUtils.requestIp(request)
    operLog.operLocation = `${region.country} ${region.province} ${region.city}`
    operLog.operName = request[SecurityConstants.USER_NAME]

    operLog.requestUrl = request.url
    operLog.requestMethod = request.method
    operLog.requestParam = JSON.stringify(request.body)

    return next.handle().pipe(
      tap((res) => {
        operLog.operStatus = OperStatus.SUCCESS
        operLog.requestResult = isObject(res) ? JSON.stringify(res) : res
        this.rpcLogService.saveOperLog(operLog).catch(() => {
          // Do not handle errors
        })
      }),
      catchError((err: Error) => {
        operLog.operStatus = OperStatus.FAIL
        operLog.requestErrmsg = isObject(err.message) ? JSON.stringify(err.message) : err.message
        this.rpcLogService.saveOperLog(operLog).catch(() => {
          // Do not handle errors
        })
        return throwError(() => err)
      })
    )
  }
}
