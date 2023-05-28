import { SetMetadata } from '@nestjs/common'
import { OperType } from '../enums/oper-type.enum'
import { LOGGER_LOG_METADATA } from '../logger.constants'

/**
 * 自定义操作日志记录
 * @param title 模块标题
 * @param operType 操作类型
 * @returns
 */
export const Log = (title: string, operType: OperType = OperType.OTHER) => {
  return SetMetadata(LOGGER_LOG_METADATA, {
    title,
    operType,
  })
}
