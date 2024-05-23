/**
* Route Constants
*
 * All the API route's defined here
 * */


/** Auth Route Constants **/
const AUTH_URL_PREFIX = "/auth";
export const REFRESH_TOKEN_URL = AUTH_URL_PREFIX+"/refresh-token"
export const LOGIN_URL = AUTH_URL_PREFIX+"/login"
export const REGISTER_URL = AUTH_URL_PREFIX+"/register"
export const FORGOT_PASSWORD_URL = AUTH_URL_PREFIX+"/reset-password"

export const RESET_PASSWORD_URL = "/reset-password/reset?token="

/** Daily Route Constants **/
const DAILY_PREFIX = "/daily"

/*TODO: refactor*/
export const DAILY_CREATE_URL = DAILY_PREFIX + "/"
export const DAILY_ORDER_URL = DAILY_PREFIX + "/order"
export const DAILY_LIST_URL = DAILY_PREFIX + "/"