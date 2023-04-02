import { DynamicModule, Global, Module } from '@nestjs/common'
import { LogInterceptorProvide } from './interceptors/log.interceptor'
import { NestLogger } from './nest.logger'
import { TypeormLogger } from './typeorm.logger'

@Global()
@Module({})
export class LoggerModule {
  static forRoot(): DynamicModule {
    return {
      module: LoggerModule,
      providers: [LogInterceptorProvide],
    }
  }

  static NestLogger = NestLogger

  static TypeormLogger = TypeormLogger
}
