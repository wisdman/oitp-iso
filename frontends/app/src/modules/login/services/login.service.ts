import { Injectable } from "@angular/core"
import { HttpClient } from  "@angular/common/http"
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms"

import { of, Observable, timer } from "rxjs"
import { switchMap, map, catchError, mapTo } from "rxjs/operators"

const API_EMAIL_EXISTS = "$API/public/email-exists"

const API_LOGIN_EMAIL = "$API/public/login/email"
const API_LOGIN_OTR = "$API/public/login/otr"
const API_LOGIN_INVITE = "$API/public/login/invite"

const DEBOUNCE_TIME = 500 //ms

import { FingerprintService, TokenService, NotificationService } from "../../../services"

@Injectable()
export class LoginService {

  constructor(
    private _fingerprintService: FingerprintService,
    private _httpClient: HttpClient,
    private _notificationService: NotificationService,
    private _tokenService: TokenService,
  ) {}

  selfInvite({ email }:{ email: string }): Observable<boolean> {
    return this._httpClient
                .put<void>(API_LOGIN_INVITE, { email: email.toLowerCase() })
                .pipe(
                  mapTo(true),
                  catchError(err => {
                    if (err.status === 409) this._notificationService.error("Данный E-mail уже зарегистрирован")
                    else this._notificationService.httpError(err.status)
                    return of(false)
                  })
                )
  }

  loginByEmail({ email, password }:{ email: string, password: string }): Observable<boolean> {
    return this._httpClient
                .post<{id: string}>(API_LOGIN_EMAIL, {
                  email: email.toLowerCase(),
                  password: password,
                  fingerprint: this._fingerprintService.fingerprint,
                })
                .pipe(
                  catchError(err => {
                    if (err.status === 406) this._notificationService.error("Неверный E-mail или Пароль")
                    else this._notificationService.httpError(err.status)
                    return of(null)
                  }),
                  map(session => {
                    this._tokenService.token = session && session.id || ""
                    return this._tokenService.hasToken
                  }),
                )
  }

  loginByInvite(id: string | null): Observable<boolean> {
    return this._httpClient
                .post<{id: string}>(API_LOGIN_INVITE, {
                  id: id,
                  fingerprint: this._fingerprintService.fingerprint,
                })
                .pipe(
                  catchError(err => {
                    if (err.status === 404) this._notificationService.error("Некоректная ссылка")
                    else if (err.status === 409) this._notificationService.error("Пользователь уже зарегистрирован. Войдите")
                    else this._notificationService.httpError(err.status)
                    return of(null)
                  }),
                  map(session => {
                    this._tokenService.token = session && session.id || ""
                    return this._tokenService.hasToken
                  }),
                )
  }

  resetPassword({ email }:{ email: string }): Observable<boolean> {
    return this._httpClient
                .put<void>(API_LOGIN_OTR, {
                  email: email.toLowerCase(),
                  resetPassword: true,
                })
                .pipe(
                  mapTo(true),
                  catchError(err => {
                    if (err.status === 406) this._notificationService.error("Данный E-mail не зарегистрирован")
                    else this._notificationService.httpError(err.status)
                    return of(false)
                  })
                )
  }

  isEmailAvailable(email: string) {
    return this._httpClient.post<{status: boolean}>(API_EMAIL_EXISTS , { email: email.toLowerCase() })
  }

  EmailAvailableValidator(message: string): AsyncValidatorFn {
    const _self = this
    return function(control: AbstractControl): Observable<ValidationErrors | null> {
      return timer(DEBOUNCE_TIME).pipe(
        switchMap(()=> _self.isEmailAvailable(control.value)),
        map(({status}) => status ? { EmailAvailable: { message }} : null)
      )
    }
  }

  EmailExistsValidator(message: string): AsyncValidatorFn {
    const _self = this
    return function(control: AbstractControl): Observable<ValidationErrors | null> {
      return timer(DEBOUNCE_TIME).pipe(
        switchMap(()=> _self.isEmailAvailable(control.value)),
        map(({status}) => status ? null : { EmailExists: { message }})
      )
    }
  }
}
