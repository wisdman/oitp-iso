import { Injectable } from "@angular/core"

import { DEBUG, APP_NAME, APP_VERSION, API_BASE } from "../app.config"

@Injectable()
export class ConfigService {
  get AppName() {
    return APP_NAME
  }

  get AppVersion() {
    return APP_VERSION
  }

  get AppFullName() {
    return `${APP_NAME} v${APP_VERSION} ${DEBUG ? "DEBUG MODE" : ""}`
  }

  get IsDebugMode() {
    return DEBUG
  }

  get IsProductionMode() {
    return !DEBUG
  }

  APIPath(subPath: string) {
    return `${API_BASE}/${subPath.trim().replace(/^\/+/, "")}`
  }
}
