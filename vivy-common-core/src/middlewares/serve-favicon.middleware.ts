import * as path from 'path'
import * as favicon from 'serve-favicon'
import { RequestHandler } from 'express'

/**
 * Favicon 中间件
 * https://www.npmjs.com/package/serve-favicon
 */
export const ServeFaviconMiddleware: RequestHandler = favicon(path.join(__dirname, '../assets/favicon.ico'))
