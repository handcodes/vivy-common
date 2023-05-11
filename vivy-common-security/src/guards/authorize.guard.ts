import { Reflector } from '@nestjs/core'
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { RequireMetadata } from '../interfaces/require-metadata.interface'
import { REQUIRE_LOGIN_METADATA, REQUIRE_ROLES_METADATA, REQUIRE_PERMISSIONS_METADATA } from '../security.constants'

/**
 * 权限校验守卫
 */
@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    // 校验 @RequireLogin 装饰器
    const requireLogin = this.reflector.get<boolean>(REQUIRE_LOGIN_METADATA, context.getHandler())
    if (requireLogin) {
      this.authService.checkLogin()
    }

    // 校验 @RequireRoles 装饰器
    const requireRoles = this.reflector.get<RequireMetadata>(REQUIRE_ROLES_METADATA, context.getHandler())
    if (requireRoles) {
      this.authService.checkRoleLogical(requireRoles)
    }

    // 校验 @RequirePermissions 装饰器
    const requirePermissions = this.reflector.get<RequireMetadata>(REQUIRE_PERMISSIONS_METADATA, context.getHandler())
    if (requirePermissions) {
      this.authService.checkPermissioniLogical(requirePermissions)
    }

    return true
  }
}
