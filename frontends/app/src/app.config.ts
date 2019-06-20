declare const DEFINE_APP_NAME: string
declare const DEFINE_APP_VERSION: string
declare const DEFINE_DEBUG: boolean

export const DEBUG = DEFINE_DEBUG

export const APP_NAME = DEFINE_APP_NAME
export const APP_VERSION = DEFINE_APP_VERSION
export const APP_FULL_NAME = `${APP_NAME} v${APP_VERSION} ${DEBUG ? "DEBUG MODE" : ""}`

export const AUTR_TOKEN_KEY = "token"
export const AUTR_TOKEN_HEADER = "X-Authorization"

export const API_BASE = "/api"

export const API_AUTH = `${API_BASE}/auth`
export const API_AUTH_LOGIN = `${API_AUTH}`
export const API_AUTH_LOGOUT = `${API_AUTH}`
export const API_AUTH_INVITE = `${API_AUTH}/invite`
export const API_AUTH_SMS = `${API_AUTH}/sms`

export const API_INFO = `${API_BASE}/public/info`

export const API_TRAINING = `${API_BASE}/public/training`
export const API_TRAINING_EVERYDAY = `${API_TRAINING}/everyday`
export const API_TRAINING_ONCE = `${API_TRAINING}/once`

export const API_USER = `${API_BASE}/public/user`

export const API_PROGRESS = `${API_BASE}/public/progress`

export const API_LOG = `${API_BASE}/public/log`

export const ASSETS = "/assets"
export const ASSETS_CARPETS = `${ASSETS}/carpets`
export const ASSETS_EXPRESSIONS = `${ASSETS}/expressions`
export const ASSETS_ICONS = `${ASSETS}/icons`
export const ASSETS_RELAX = `${ASSETS}/relax`
export const ASSETS_STORYTELLING = `${ASSETS}/storytelling`