import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { LoggerService } from '@vivy-cloud/common-logger'
import { AjaxResult } from '../utils/class/res.class'

/**
 * 未知异常过滤器
 */
@Catch()
export class UnknownExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const message = exception instanceof HttpException ? exception.message : '服务异常，请稍后再试'

    this.logger.error(exception.message, exception.stack, UnknownExceptionFilter.name)
    response.status(status).json(AjaxResult.error(status, message))
  }
}
