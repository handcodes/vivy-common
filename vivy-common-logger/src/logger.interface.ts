import { FactoryProvider } from '@nestjs/common'
import { OperType } from './enums/oper-type.enum'

export interface LoggerOptions {
  /**
   * 应用名称
   * @default vivy
   */
  appName?: string
  /**
   * 日志路径
   * @default path.resolve(process.cwd(), 'logs')
   */
  logPath?: string
}

export interface LoggerAsyncOptions {
  name?: string
  useFactory: (...args: any[]) => Promise<LoggerOptions> | LoggerOptions
  inject?: FactoryProvider['inject']
}

export interface LoggerLogMetaData {
  /**
   * 日志标题
   */
  title: string
  /**
   * 操作类型
   */
  operType: OperType
}
