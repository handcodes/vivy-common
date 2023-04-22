/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common'
import { Body, Post } from '@nest-micro/http'
import { Loadbalanced } from '@nest-micro/loadbalance'
import { OperLogDto } from './dto/oper-log.dto'

/**
 * 远程日志服务
 */
@Injectable()
@Loadbalanced('vivy-system')
export class RemoteLogService {
  /**
   * 添加操作日志
   */
  @Post('remote/log/saveOperLog')
  async saveOperLog(@Body() operLog: OperLogDto) {}
}
