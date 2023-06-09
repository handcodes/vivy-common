/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common'
import { Body, Post, SetHeader } from '@nest-micro/http'
import { Loadbalanced } from '@nest-micro/loadbalance'
import { ServiceNameEnums } from '@vivy-cloud/common-core/lib/enums'
import { SecurityConstants } from '@vivy-cloud/common-core/lib/constants'
import { OperLogDto } from './dto/oper-log.dto'

/**
 * 远程日志服务调用
 */
@Injectable()
@Loadbalanced(ServiceNameEnums.SYSTEM_SERVICE)
export class RpcLogService {
  /**
   * 添加操作日志
   * @author vivy
   * @date 2023-04-26 17:14:14
   */
  @Post('remote/log/saveOperLog')
  @SetHeader(SecurityConstants.FROM_SOURCE, SecurityConstants.SOURCE_INNER)
  async saveOperLog(@Body() operLog: OperLogDto) {}
}
