import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { HttpClient } from  "@angular/common/http"
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms"

import { of, Observable, timer } from "rxjs"
import { switchMap, map, catchError, mapTo } from "rxjs/operators"

const API_EMAIL_EXISTS = "$API/public/email-exists"
const API_SELF_INVITE = "$API/public/invite"
const API_LOGIN_BY_EMAIL = "$API/public/login/email"

const DEBOUNCE_TIME = 500 //ms

import { FingerprintService, TokenService, NotificationService } from "../../../services"

@Injectable()
export class LoginService {

  constructor(
    private _fingerprintService: FingerprintService,
    private _httpClient: HttpClient,
    private _notificationService: NotificationService,
    private _router: Router,
    private _tokenService: TokenService,
  ) {}

  selfInvite({ email }:{ email: string }): Observable<boolean> {
    return this._httpClient
                .post<void>(API_SELF_INVITE, { email: email.toLowerCase() })
                .pipe(
                  mapTo(true),
                  catchError(err => {
                    if (err.status === 409) this._notificationService.error("Данный E-mail уже зарегистрирован")
                    else this._notificationService.httpError(err.status)
                    return of(false)
                  })
                )
  }

  loginByEmail({ email, password }:{ email: string, password: string }): Observable<void> {
    return this._httpClient
                .post<{id: string}>(API_LOGIN_BY_EMAIL, {
                  email: email.toLowerCase(),
                  password: password,
                  fingerprint: this._fingerprintService.fingerprint,
                })
                .pipe(
                  catchError(err => {
                    if (err.status < 500) this._notificationService.error("Неверный E-mail или Пароль")
                    return of(null)
                  }),
                  map(session => {
                    this._tokenService.token = session && session.id || ""
                    if (this._tokenService.hasToken) {
                      this._router.navigateByUrl("/")
                    }
                    return undefined
                  }),
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
