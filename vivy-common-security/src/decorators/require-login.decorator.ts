import { SetMetadata } from '@nestjs/common'
import { REQUIRE_LOGIN_METADATA } from '../security.constants'

/**
 * 登录认证：只有登录之后才能进入该方法
 */
export const RequireLogin = () => {
  return SetMetadata(REQUIRE_LOGIN_METADATA, true)
}
