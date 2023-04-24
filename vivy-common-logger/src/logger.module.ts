import { DynamicModule, Global, Module, Provider } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { LOGGER_OPTIONS } from './logger.constants'
import { LoggerOptions, LoggerAsyncOptions } from './logger.interface'
import { LoggerService } from './logger.service'
import { LogInterceptor } from './interceptors/log.interceptor'
import { RemoteLogService } from './services/remote-log.service'
import { NestLogger } from './nest.logger'
import { TypeormLogger } from './typeorm.logger'

@Global()
@Module({})
export class LoggerModule {
  static forRoot(options?: LoggerOptions): DynamicModule {
    return this.register({
      useFactory: () => options || {},
    })
  }

  static forRootAsync(options: LoggerAsyncOptions): DynamicModule {
    return this.register(options)
  }

  private static register(options: LoggerAsyncOptions) {
    const OptionsProvider: Provider = {
      provide: LOGGER_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject,
    }

    const LoggerServiceProvider: Provider = {
      provide: LoggerService,
      useFactory: (options: LoggerOptions) => {
        return NestLogger(options)
      },
      inject: [LOGGER_OPTIONS],
    }

    return {
      module: LoggerModule,
      providers: [
        OptionsProvider,
        RemoteLogService,
        LoggerServiceProvider,
        {
          provide: APP_INTERCEPTOR,
          useClass: LogInterceptor,
        },
      ],
      exports: [LoggerServiceProvider],
    }
  }

  static NestLogger = NestLogger

  static TypeormLogger = TypeormLogger
}
