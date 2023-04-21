import { DynamicModule, Global, Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { LogInterceptor } from './interceptors/log.interceptor'
import { NestLogger } from './nest.logger'
import { TypeormLogger } from './typeorm.logger'

@Global()
@Module({})
export class LoggerModule {
  static forRoot(): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useClass: LogInterceptor,
        },
      ],
    }
  }

  static NestLogger = NestLogger

  static TypeormLogger = TypeormLogger
}
