import { HttpErrorInterceptor } from './http-error.interceptor'
import { HttpRequestInterceptor } from './http-request.interceptor'

export const HttpGlobalInterceptors = [HttpErrorInterceptor, HttpRequestInterceptor]
