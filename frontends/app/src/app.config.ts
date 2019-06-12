declare const DEFINE_APP_NAME: string
declare const DEFINE_APP_VERSION: string
declare const DEFINE_DEBUG: boolean

export const DEBUG = DEFINE_DEBUG

export const APP_NAME = DEFINE_APP_NAME
export const APP_VERSION = DEFINE_APP_VERSION
export const APP_FULL_NAME = `${APP_NAME} v${APP_VERSION} ${DEBUG ? "DEBUG MODE" : ""}`

export const AUTR_TOKEN_KEY = "token"
export const AUTR_TOKEN_HEADER = "X-Authorization"

export const AUTH_BASE = "/auth"

export const AUTH_LOGIN = `${AUTH_BASE}`
export const AUTH_LOGOUT = `${AUTH_BASE}`

export const AUTH_INVITE = `${AUTH_BASE}/invite`
export const AUTH_SMS = `${AUTH_BASE}/sms`


export const API_BASE = "/api"

export const API_AUTH = `${API_BASE}/auth`
export const API_REGISTER = `${API_BASE}/register`

export const API_USER = `${API_BASE}/user`

export const API_RECOMMENDATION = `${API_BASE}/recommendation`

export const API_TRAINING = `${API_BASE}/training`
export const API_TRAINING_EVERYDAY = `${API_TRAINING}/everyday`
export const API_TRAINING_ONCE = `${API_TRAINING}/once`

export const ASSETS = "/assets"
export const ASSETS_EXPRESSIONS = `${ASSETS}/expressions`
export const ASSETS_ICONS = `${ASSETS}/icons`
export const ASSETS_RELAX = `${ASSETS}/relax`