import { DynamicModule, Global, Module } from '@nestjs/common'
import { RemoteLogService } from './services/remote-log.service'

@Global()
@Module({})
export class RemoteApiModule {
  static forRoot(): DynamicModule {
    return {
      module: RemoteApiModule,
      providers: [RemoteLogService],
      exports: [RemoteLogService],
    }
  }
}
