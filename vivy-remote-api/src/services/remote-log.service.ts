/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common'
import { Loadbalanced } from '@nest-micro/loadbalance'
import { Body, Post } from '@nest-micro/http'
import { OperLogDto } from '../dto/oper-log.dto'

/**
 * 远程日志服务
 */
@Loadbalanced('vivy-system')
@Injectable()
export class RemoteLogService {
  /**
   * 添加操作日志
   */
  @Post('remote/log/saveOperLog')
  async saveOperLog(@Body() operLog: OperLogDto) {}
}
