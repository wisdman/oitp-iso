import { Injectable } from "@angular/core"

import {
  HttpBackend,
  HttpClient,
} from  "@angular/common/http"

import {
  BehaviorSubject,
  never,
  Observable,
  of,
} from "rxjs"

import {
  catchError,
  map,
  switchMap,
  share,
} from "rxjs/operators"

import {
  API_AUTH_INVITE,
  API_AUTH_LOGIN,
  API_AUTH_SMS,
  API_LOG,
  API_PROGRESS,
  API_USER,
  APP_FULL_NAME,
} from "../app.config"

import {
  ILog,
  INetworkInformation,
  IProgress,
  IUser,
} from "./user.interfaces"

import { NotificationService } from "./notification.service"
import { TokenService } from "./token.service"

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(
    private _httpBackend: HttpBackend,
    private _httpClient:HttpClient,
    private _notificationService: NotificationService,
    private _tokenService: TokenService,
  ) {}

  private _independentHttpClient = new HttpClient(this._httpBackend)

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

  login({
    email,
    password,
  }:{
    email: string,
    password: string,
  }): Observable<boolean> {
    return this._independentHttpClient
            .post<{id?: string}>(API_AUTH_LOGIN, {
              email: email.toLowerCase(),
              password: password,
              fingerprint: this.fingerprint,
            }).pipe(
              catchError(err => {
                if (err.status === 401) {
                  return of(null)
                }
                this._notificationService.httpError(err.status)
                return never()
              }),
              map(session => {
                if (!session || !session.id) {
                  this._tokenService.token = ""
                  return false
                }

                this._tokenService.token = session.id
                return true
              }),
            )
  }

  invite({
    email
  }:{
    email: string,
  }) {
    return this._independentHttpClient
            .post(API_AUTH_INVITE, {
              email: email.toLowerCase(),
              fingerprint: this.fingerprint,
            })
  }

  sms({
    phone,
    code,
  }:{
    phone: string
    code: number
  }) {
    return this._independentHttpClient
            .post(API_AUTH_SMS, {
              phone: phone.toLowerCase(),
              code: code,
              fingerprint: this.fingerprint,
            })
  }

  private _reloadUser: BehaviorSubject<void> = new BehaviorSubject<void>(undefined)
  reloadUser() {
    this._reloadUser.next()
  }

  progress = this._reloadUser.pipe(
    switchMap(() => this._httpClient.get<IProgress>(API_PROGRESS)),
    share(),
  )

  user = this._reloadUser.pipe(
    switchMap(() => this._httpClient.get<IUser>(API_USER)),
    share(),
  )

  log = this._reloadUser.pipe(
    switchMap(() => this._httpClient.get<ILog>(API_LOG)),
    share(),
  )
}
