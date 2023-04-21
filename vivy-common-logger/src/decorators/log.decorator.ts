import { SetMetadata } from '@nestjs/common'
import { BusinessType } from '../enums/business-type.enum'
import { OperatorType } from '../enums/operator-type.enum'
import { LOGGER_LOG_METADATA } from '../logger.constants'

/**
 * 自定义操作日志记录
 * @param title 模块标题
 * @param businessType 业务类型
 * @param operatorType 操作类别
 * @returns
 */
export const Log = (
  title: string,
  businessType: BusinessType = BusinessType.OTHER,
  operatorType: OperatorType = OperatorType.OTHER
) => {
  return SetMetadata(LOGGER_LOG_METADATA, {
    title,
    businessType,
    operatorType,
  })
}
