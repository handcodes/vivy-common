/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common'
import { Body, Post } from '@nest-micro/http'
import { Loadbalanced } from '@nest-micro/loadbalance'
import { ServiceNameEnums } from '@vivy-cloud/common-core/lib/enums'
import { OperLogDto } from './dto/oper-log.dto'

/**
 * 远程日志服务
 */
@Injectable()
@Loadbalanced(ServiceNameEnums.SYSTEM_SERVICE)
export class RemoteLogService {
  /**
   * 添加操作日志
   * @author vivy
   * @date 2023-04-26 17:14:14
   */
  @Post('remote/log/saveOperLog')
  async saveOperLog(@Body() operLog: OperLogDto) {}
}
