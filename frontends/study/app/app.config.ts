declare const DEFINE_APP_NAME: string
declare const DEFINE_APP_VERSION: string
declare const DEFINE_DEBUG: boolean

export const DEBUG = DEFINE_DEBUG

export const APP_NAME = DEFINE_APP_NAME
export const APP_VERSION = DEFINE_APP_VERSION
export const APP_FULL_NAME = `${APP_NAME} v${APP_VERSION} ${DEBUG ? "Debug mode" : ""}`

export const API_BASE = "/api"
