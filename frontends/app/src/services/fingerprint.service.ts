import { Injectable } from "@angular/core"

import { APP_FULL_NAME } from "../app.config"

export interface INetworkInformation {
  downlink: number,
  effectiveType: string,
  rtt: number,
  type: string,
}

@Injectable({ providedIn: "root" })
export class FingerprintService {
  get fingerprint() {
    const connection:INetworkInformation = (<any>navigator).connection
                                        || (<any>navigator).mozConnection
                                        || (<any>navigator).webkitConnection
    return {
      app: APP_FULL_NAME,
      language: navigator.language,
      languages: navigator.languages,
      userAgent: navigator.userAgent,
      connection: connection && {
        downlink: connection.downlink || 0,
        effectiveType: connection.effectiveType || null,
        rtt: connection.rtt || 0,
        type: connection.type || null,
      } || null
    }
  }
}
