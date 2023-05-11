declare namespace Express {
  export interface Request {
    user_key?: string
    user_id?: number
    user_name?: string
    login_user?: import('../interfaces/sys-login-user.interface').ISysLoginUser
  }
}
