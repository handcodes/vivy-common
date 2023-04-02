import { SetMetadata } from '@nestjs/common'
import { BusinessType } from '../enums/business-type.enum'
import { OperatorType } from '../enums/operator-type.enum'
import { LOGGER_LOGMETA } from '../logger.constants'

export const Log = (
  title: string,
  businessType: BusinessType = BusinessType.OTHER,
  operatorType: OperatorType = OperatorType.OTHER,
  isSaveRequestData = true,
  isSaveResponseData = true
) => {
  return SetMetadata(LOGGER_LOGMETA, {
    title,
    businessType,
    operatorType,
    isSaveRequestData,
    isSaveResponseData,
  })
}
