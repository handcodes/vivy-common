import { Provider } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { UnknownExceptionFilter } from './unknown.filter'
import { ServiceExceptionFilter } from './service.filter'
import { NotRoleExceptionFilter } from './auth/not-role.filter'
import { NotPermissionExceptionFilter } from './auth/not-permission.filter'

export const NestGlobalFilters: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: UnknownExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: ServiceExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: NotRoleExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: NotPermissionExceptionFilter,
  },
]
