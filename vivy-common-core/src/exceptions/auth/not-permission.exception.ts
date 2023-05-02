import { isArray } from 'lodash'
import { HttpException, HttpStatus } from '@nestjs/common'

/**
 * 未能通过的权限认证异常
 */
export class NotPermissionException extends HttpException {
  constructor(permissions: string | string[]) {
    const message = isArray(permissions) ? permissions.join(',') : permissions
    super(message, HttpStatus.FORBIDDEN)
  }
}
