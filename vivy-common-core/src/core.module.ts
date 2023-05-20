import * as path from 'path'
import { DynamicModule, Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { CONFIG, NACOS_CONFIG } from '@nest-micro/common'
import { ConfigModule, Config } from '@nest-micro/config'
import { NacosConfigModule } from '@nest-micro/nacos-config'
import { DiscoveryModule } from '@nest-micro/discovery'
import { NacosDiscoveryModule } from '@nest-micro/nacos-discovery'
import { LoadbalanceModule } from '@nest-micro/loadbalance'
import { BrakesModule } from '@nest-micro/brakes'
import { HttpModule } from '@nest-micro/http'
import { LoggerModule } from '@vivy-cloud/common-logger'
import { ClsModule } from 'nestjs-cls'

import { CoreOptions } from './interfaces/core-options.interface'
import { NestGlobalPipes } from './pipes/global'
import { NestGlobalFilters } from './exceptions-filters/global'
import { NestGlobalMiddlewares } from './middlewares/global'
import { NestGlobalServices } from './services/global'
import { HttpGlobalInterceptors } from './interceptors/global'

@Global()
@Module({})
export class CoreModule implements NestModule {
  static forRoot(options: CoreOptions): DynamicModule {
    return {
      module: CoreModule,
      imports: [
        ClsModule.forRoot({
          global: true,
          middleware: {
            mount: true,
            saveReq: true,
            saveRes: true,
            generateId: true,
          },
        }),

        ConfigModule.forRoot({
          dir: path.resolve(options.dirname, './config'),
        }),
        NacosConfigModule.forRootAsync({
          dependencies: [CONFIG],
        }),

        DiscoveryModule.forRootAsync({
          dependencies: [CONFIG, NACOS_CONFIG],
        }),
        NacosDiscoveryModule.forRootAsync({
          dependencies: [CONFIG, NACOS_CONFIG],
        }),
        LoadbalanceModule.forRootAsync({
          dependencies: [CONFIG, NACOS_CONFIG],
        }),

        BrakesModule.forRootAsync({
          dependencies: [CONFIG, NACOS_CONFIG],
        }),
        HttpModule.forRootAsync({
          dependencies: [CONFIG, NACOS_CONFIG],
        }),

        LoggerModule.forRootAsync({
          useFactory(config: Config) {
            return {
              appName: config.get('application.name'),
              logPath: path.resolve(options.dirname, '../logs'),
            }
          },
          inject: [CONFIG, NACOS_CONFIG],
        }),
      ],
      providers: [...NestGlobalPipes, ...NestGlobalFilters, ...NestGlobalServices, ...HttpGlobalInterceptors],
      exports: [...NestGlobalServices],
    }
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(...NestGlobalMiddlewares).forRoutes('/')
  }
}
