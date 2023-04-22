import * as path from 'path'
import { assign } from 'lodash'
import { WinstonModule } from 'nest-winston'
import { WinstonTransportBuilder } from './logger.transport'
import { LoggerOptions } from './logger.interface'

const defaultOptions: LoggerOptions = {
  appName: 'vivy',
  logPath: path.resolve(process.cwd(), 'logs'),
}

/**
 * 自定义 NestJs 日志
 */
export const NestLogger = (options: LoggerOptions = defaultOptions) => {
  const TransportBuilder = new WinstonTransportBuilder(assign(defaultOptions, options))

  return WinstonModule.createLogger({
    transports: [
      TransportBuilder.buildConsoleTransportInstance(),
      TransportBuilder.buildDailyRotateFileTransportInstance({
        filename: path.resolve(options.logPath, `${options.appName}-%DATE%.log`),
      }),
    ],
  })
}
