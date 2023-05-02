import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'
import { LoggerService } from '@vivy-cloud/common-logger'
import { ServiceException } from '../exceptions/service.exception'
import { AjaxResult } from '../utils/class/res.class'

/**
 * 业务逻辑异常过滤器
 */
@Catch(ServiceException)
export class ServiceExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: ServiceException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse<Response>()

    this.logger.error(exception.getMessage(), request.url, ServiceExceptionFilter.name)
    response.status(HttpStatus.OK).json(AjaxResult.error(exception.getCode(), exception.getMessage()))
  }
}
