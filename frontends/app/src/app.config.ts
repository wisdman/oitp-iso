declare const DEFINE_APP_NAME: string
declare const DEFINE_APP_VERSION: string
declare const DEFINE_DEBUG: boolean

export const DEBUG = DEFINE_DEBUG

export const APP_NAME = DEFINE_APP_NAME
export const APP_VERSION = DEFINE_APP_VERSION
export const APP_FULL_NAME = `${APP_NAME} v${APP_VERSION} ${DEBUG ? "DEBUG MODE" : ""}`

export const AUTH_TOKEN_KEY = "token"
export const AUTH_TOKEN_HEADER = "X-Authorization"

export const API_BASE = "/api"

export const API_AUTH = `${API_BASE}/auth`

export const API_PUBLIC = `${API_BASE}/public`

export const API_PUBLIC_INFO = `${API_PUBLIC}/info`

export const API_PUBLIC_LOGIN = `${API_PUBLIC}/login`

export const API_PUBLIC_LOGIN_EMAIL_EXISTS = `${API_PUBLIC_LOGIN}/email/exists`
export const API_PUBLIC_LOGIN_BY_EMAIL     = `${API_PUBLIC_LOGIN}/email`
export const API_PUBLIC_LOGIN_BY_INVITE    = `${API_PUBLIC_LOGIN}/invite`
export const API_PUBLIC_LOGIN_BY_OTR       = `${API_PUBLIC_LOGIN}/otr`
export const API_PUBLIC_LOGIN_BY_SMS       = `${API_PUBLIC_LOGIN}/sms`

export const API_PUBLIC_TARIFF = `${API_PUBLIC}/tariff`

export const API_SELF = `${API_BASE}/self`

export const API_SELF_INVITE   = `${API_SELF}/invite`
export const API_SELF_LOG      = `${API_SELF}/log`
export const API_SELF_LOGOUT   = `${API_SELF}/logout`
export const API_SELF_PAYMENT  = `${API_SELF}/payment`
export const API_SELF_PROGRESS = `${API_SELF}/progress`
export const API_SELF_TRAINING = `${API_SELF}/training`
export const API_SELF_USER     = `${API_SELF}/user`

export const ASSETS = "/assets"
export const ASSETS_CARPETS = `${ASSETS}/carpets`
export const ASSETS_EXPRESSIONS = `${ASSETS}/expressions`
export const ASSETS_ICONS = `${ASSETS}/icons`
export const ASSETS_RELAX = `${ASSETS}/relax`
export const ASSETS_STORYTELLING = `${ASSETS}/storytelling`
