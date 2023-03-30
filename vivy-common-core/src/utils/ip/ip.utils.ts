import { v4, v6 } from 'internal-ip'

/**
 * 获取 IP 方法
 */
export class IpUtils {
  /**
   * 异步返回内部 IPv4 地址
   * @example 10.0.0.79
   * @return IP 地址
   */
  public static internalIpV4 = () => v4()

  /**
   * 异步返回内部 IPv6 地址
   * @example fe80::1
   * @return IP 地址
   */
  public static internalIpV6 = () => v6()

  /**
   * 同步返回内部 IPv4 地址
   * @example 10.0.0.79
   * @return IP 地址
   */
  public static internalIpV4Sync = () => v4.sync()

  /**
   * 同步返回内部 IPv6 地址
   * @example fe80::1
   * @return IP 地址
   */
  public static internalIpV6Sync = () => v6.sync()
}
