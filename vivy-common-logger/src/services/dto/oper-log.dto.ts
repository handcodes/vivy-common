import { OperType } from '../../enums/oper-type.enum'
import { OperStatus } from '../../enums/oper-status.enum'

export class OperLogDto {
  /**
   * 模块标题
   */
  title: string

  /**
   * 操作类型
   */
  operType: OperType

  /**
   * 操作人员
   */
  operName: string

  /**
   * 方法名称
   */
  operMethod: string

  /**
   * 主机地址
   */
  operIp: string

  /**
   * 操作地点
   */
  operLocation: string

  /**
   * 操作状态
   */
  operStatus: OperStatus

  /**
   * 请求URL
   */
  requestUrl: string

  /**
   * 请求方式
   */
  requestMethod: string

  /**
   * 请求参数
   */
  requestParam: string

  /**
   * 请求返回参数
   */
  requestResult: string

  /**
   * 请求错误消息
   */
  requestErrmsg: string
}
