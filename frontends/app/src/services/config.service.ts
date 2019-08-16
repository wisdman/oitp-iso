import { Injectable } from "@angular/core"
import { HttpRequest } from "@angular/common/http"

declare const DEFINE_APP_NAME: string
declare const DEFINE_APP_VERSION: string
declare const DEFINE_DEBUG: boolean
declare const DEFINE_ASSETS: string
declare const DEFINE_API_URL: string
declare const DEFINE_API_AUTH_HEADER: string

import { TokenService } from "./token.service"

@Injectable({ providedIn: "root" })
export class ConfigService {
  constructor(
    private _tokenService: TokenService,
  ) {}

  load(): Promise<void> {
    return Promise.resolve()
  }

  readonly DebugMode = DEFINE_DEBUG
  readonly ProductionMode = !DEFINE_DEBUG

  readonly Assets = DEFINE_ASSETS

  readonly AppName = DEFINE_APP_NAME
  readonly AppVersion = DEFINE_APP_VERSION
  readonly AppFullName = `${this.AppName} v${this.AppVersion} ${this.DebugMode ? "DEBUG MODE" : ""}`

  prepareURL(url: string): URL {
    if (/^https?:\/\//i.test(url)) return new URL(url)
    if (/^\//.test(url)) return new URL(`${window.location.origin}/${url.replace(/^\/+/, "")}`)
    return new URL(`${window.location.protocol}//${url}`)
  }

  readonly API = this.prepareURL(DEFINE_API_URL)
  readonly APIAuthHeader = DEFINE_API_AUTH_HEADER

  prepareRequest(request: HttpRequest<unknown>): [HttpRequest<unknown>, boolean?] {
    const url = request.url.startsWith("$API") ? request.url.replace(/^\$API/, this.API.href) : request.url
    const requestURL = this.prepareURL(url)

    if (requestURL.origin !== this.API.origin) return [request, true]

    return [
      request.clone({
        url: requestURL.href,
        setHeaders: {
          [this.APIAuthHeader]: this._tokenService.token
        }
      })
    ]
  }
}

export function ConfigServiceFactory(configService: ConfigService): Function {
  return () => configService.load()
}
