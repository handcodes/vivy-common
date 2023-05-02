import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'
import { LoggerService } from '@vivy-cloud/common-logger'
import { NotRoleException } from '../exceptions/auth/not-role.exception'
import { AjaxResult } from '../utils/class/res.class'

/**
 * 角色认证异常过滤器
 */
@Catch(NotRoleException)
export class NotRoleExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse<Response>()

    this.logger.error(`角色权限校验失败${exception.message}`, request.url, NotRoleExceptionFilter.name)
    response.status(HttpStatus.FORBIDDEN).json(AjaxResult.error(HttpStatus.FORBIDDEN, '没有访问权限，请联系管理员授权'))
  }
}
