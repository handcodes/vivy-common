declare namespace Express {
  export interface Request {
    user_key?: string
    user_id?: number
    user_name?: string
    login_user?: import('../models/sys-login-user.model').SysLoginUser
  }
}
