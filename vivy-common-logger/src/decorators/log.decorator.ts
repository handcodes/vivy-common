import { SetMetadata } from '@nestjs/common'
import { BusinessType } from '../enums/business-type.enum'
import { OperatorType } from '../enums/operator-type.enum'
import { LOGGER_LOG_METADATA } from '../logger.constants'

export const Log = (
  title: string,
  businessType: BusinessType = BusinessType.OTHER,
  operatorType: OperatorType = OperatorType.OTHER,
  isSaveRequestData = true,
  isSaveResponseData = true
) => {
  return SetMetadata(LOGGER_LOG_METADATA, {
    title,
    businessType,
    operatorType,
    isSaveRequestData,
    isSaveResponseData,
  })
}
