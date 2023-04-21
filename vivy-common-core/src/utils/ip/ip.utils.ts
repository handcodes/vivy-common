import { v4, v6 } from 'internal-ip'
import { getClientIp, Request } from 'request-ip'
import IP2Region from 'ip2region'

/**
 * 获取 IP 方法
 */
export class IpUtils {
  private static IP2RegionInstance = new IP2Region()

  /**
   * 异步返回内部 IPv4 地址
   * @example 10.0.0.79
   * @return IP 地址
   */
  static internalIpV4 = () => v4()

  /**
   * 异步返回内部 IPv6 地址
   * @example fe80::1
   * @return IP 地址
   */
  static internalIpV6 = () => v6()

  /**
   * 同步返回内部 IPv4 地址
   * @example 10.0.0.79
   * @return IP 地址
   */
  static internalIpV4Sync = () => v4.sync()

  /**
   * 同步返回内部 IPv6 地址
   * @example fe80::1
   * @return IP 地址
   */
  static internalIpV6Sync = () => v6.sync()

  /**
   * 获取用户请求 IP 地址
   */
  static requestIp = (req: Request) => getClientIp(req)

  /**
   * 获取 Ip 地理位置信息
   */
  static ip2Region = (ip: string) => this.IP2RegionInstance.search(ip)
}
