import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'
import { LoggerService } from '@vivy-cloud/common-logger'
import { NotPermissionException } from '../../exceptions/auth/not-permission.exception'
import { AjaxResult } from '../../models/ajax-result.model'

/**
 * 权限认证异常过滤器
 */
@Catch(NotPermissionException)
export class NotPermissionExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse<Response>()

    this.logger.error(`权限码校验失败:${exception.message}`, request.url, NotPermissionExceptionFilter.name)
    response.status(HttpStatus.FORBIDDEN).json(AjaxResult.error(HttpStatus.FORBIDDEN, '没有访问权限，请联系管理员授权'))
  }
}
