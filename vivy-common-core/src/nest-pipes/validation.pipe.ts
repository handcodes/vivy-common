import { APP_PIPE } from '@nestjs/core'
import { ValidationPipe as NestValidationPipe } from '@nestjs/common'

export const ValidationPipe = {
  provide: APP_PIPE,
  useValue: new NestValidationPipe({
    transform: true,
    whitelist: true,
  }),
}
