import { DynamicModule, Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { TokenConstants } from '@vivy-cloud/common-core'
import { SecurityOptions } from './interfaces/security-options.interface'
import { AuthService } from './services/auth.service'
import { TokenService } from './services/token.service'
import { AuthorizeGuard } from './guards/authorize.guard'
import { HeaderMiddleware } from './middlewares/header.middleware'

@Global()
@Module({})
export class SecurityModule implements NestModule {
  static forRoot(options: SecurityOptions): DynamicModule {
    return {
      module: SecurityModule,
      imports: [
        JwtModule.registerAsync({
          useFactory() {
            return {
              global: true,
              secret: TokenConstants.SECRET,
            }
          },
        }),
      ],
      providers: [
        AuthService,
        TokenService,
        {
          provide: APP_GUARD,
          useClass: AuthorizeGuard,
        },
      ],
      exports: [AuthService, TokenService],
    }
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HeaderMiddleware).exclude('/login', '/logout', '/refresh').forRoutes('/')
  }
}

@Global()
@Module({})
export class SecurityTokenModule {
  static forRoot(options: SecurityOptions): DynamicModule {
    return {
      module: SecurityTokenModule,
      imports: [
        JwtModule.registerAsync({
          useFactory() {
            return {
              global: true,
              secret: TokenConstants.SECRET,
            }
          },
        }),
      ],
      providers: [TokenService],
      exports: [TokenService],
    }
  }
}
