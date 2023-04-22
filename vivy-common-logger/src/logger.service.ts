import { Injectable } from '@nestjs/common'
import { WinstonLogger } from 'nest-winston'

@Injectable()
export class LoggerService extends WinstonLogger {}
