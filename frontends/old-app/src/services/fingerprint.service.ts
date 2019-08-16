import { Injectable } from "@angular/core"

import { ConfigService } from "./config.service"

@Injectable()
export class FingerprintService {
  constructor(
    private _configService: ConfigService,
  ) {}

  private _baseFingerprint = {
    app: this._configService.AppFullName,
    language: navigator.language,
    languages: navigator.languages,
    userAgent: navigator.userAgent,
  }

  private get _connection() {
    const connection:{
      downlink: number
      effectiveType: string
      rtt: number
      type: string
    }  = (<any>navigator).connection
      || (<any>navigator).mozConnection
      || (<any>navigator).webkitConnection

    return connection && {
      downlink: connection.downlink || 0,
      effectiveType: connection.effectiveType || null,
      rtt: connection.rtt || 0,
      type: connection.type || null,
    } || null
  }

  get _fingerprint() {
    return {
      ...this._baseFingerprint,
      connection: this._connection,
    }
  }
}
