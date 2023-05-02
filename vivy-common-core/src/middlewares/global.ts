import { ServeFaviconMiddleware } from './serve-favicon.middleware'

export const NestGlobalMiddlewares: Function[] = [ServeFaviconMiddleware]
