import * as path from 'path'
import { DynamicModule, Global, Module } from '@nestjs/common'
import { CONFIG, CONFIG_NACOS } from '@nest-micro/common'
import { ConfigModule, Config } from '@nest-micro/config'
import { ConfigNacosModule } from '@nest-micro/config-nacos'
import { DiscoveryModule } from '@nest-micro/discovery'
import { DiscoveryNacosModule } from '@nest-micro/discovery-nacos'
import { LoadbalanceModule } from '@nest-micro/loadbalance'
import { BrakesModule } from '@nest-micro/brakes'
import { HttpModule } from '@nest-micro/http'
import { LoggerModule } from '@vivy-cloud/common-logger'

import { CoreOptions } from './interfaces/core-options.interface'
import { NestGlobalPipes } from './nest-pipes'
import { HttpGlobalInterceptors } from './http-interceptors'

@Global()
@Module({})
export class CoreModule {
  static forRoot(options: CoreOptions): DynamicModule {
    return {
      module: CoreModule,
      imports: [
        ConfigModule.forRoot({
          dir: path.resolve(options.dirname, './config'),
        }),
        ConfigNacosModule.forRootAsync({
          dependencies: [CONFIG],
        }),

        DiscoveryModule.forRootAsync({
          dependencies: [CONFIG, CONFIG_NACOS],
        }),
        DiscoveryNacosModule.forRootAsync({
          dependencies: [CONFIG, CONFIG_NACOS],
        }),
        LoadbalanceModule.forRootAsync({
          dependencies: [CONFIG, CONFIG_NACOS],
        }),

        BrakesModule.forRootAsync({
          dependencies: [CONFIG, CONFIG_NACOS],
        }),
        HttpModule.forRootAsync({
          dependencies: [CONFIG, CONFIG_NACOS],
        }),

        LoggerModule.forRootAsync({
          useFactory(config: Config) {
            return {
              appName: config.get('application.name'),
              logPath: path.resolve(options.dirname, '../logs'),
            }
          },
          inject: [CONFIG, CONFIG_NACOS],
        }),
      ],
      providers: [...NestGlobalPipes, ...HttpGlobalInterceptors],
      exports: [
        ConfigModule,
        ConfigNacosModule,
        DiscoveryModule,
        DiscoveryNacosModule,
        LoadbalanceModule,
        BrakesModule,
        HttpModule,
        LoggerModule,
      ],
    }
  }
}
