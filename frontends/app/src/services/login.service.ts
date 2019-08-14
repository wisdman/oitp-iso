import { Injectable } from "@angular/core"
import { HttpBackend, HttpClient } from  "@angular/common/http"
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms"

import { Observable, never, timer, of } from "rxjs"
import { switchMap, map, catchError } from "rxjs/operators"

import {
  API_PUBLIC_LOGIN_EMAIL_EXISTS,
  API_PUBLIC_LOGIN_BY_EMAIL,
} from "../app.config"

import { FingerprintService } from "./fingerprint.service"
import { NotificationService } from "./notification.service"
import { TokenService } from "./token.service"

@Injectable({ providedIn: "root" })
export class LoginService {

  constructor(
    private _fingerprintService: FingerprintService,
    private _httpBackend: HttpBackend,
    private _notificationService: NotificationService,
    private _tokenService: TokenService,
  ) {}

  private _independentHttpClient = new HttpClient(this._httpBackend)

  loginByEmail({ email, password }:{ email: string, password: string }): Observable<boolean> {
    return this._independentHttpClient
                .post<{id: string}>(API_PUBLIC_LOGIN_BY_EMAIL, {
                  email: email.toLowerCase(),
                  password: password,
                  fingerprint: this._fingerprintService.fingerprint,
                }).pipe(
                  catchError(err => {
                    this._notificationService.httpError(err.status)
                    return of(null)
                  }),
                  map(session => {
                    this._tokenService.token = session && session.id || ""
                    return !!this._tokenService.token
                  }),
                )
  }

  isEmailAvailable(email: string) {
    return this._independentHttpClient
                .post<{status: boolean}>(API_PUBLIC_LOGIN_EMAIL_EXISTS, { email: email.toLowerCase()})
                .pipe(catchError(err => {
                  this._notificationService.httpError(err.status)
                  return never()
                }))
  }

  EmailAvailableValidator(message: string): AsyncValidatorFn {
    const _self = this
    return function(control: AbstractControl): Observable<ValidationErrors | null> {
      return timer(500).pipe(
        switchMap(()=> _self.isEmailAvailable(control.value)),
        map(({status}) => status ? { EmailAvailable: { message }} : null)
      )
    }
  }

  EmailExistsValidator(message: string): AsyncValidatorFn {
    const _self = this
    return function(control: AbstractControl): Observable<ValidationErrors | null> {
      return timer(500).pipe(
        switchMap(()=> _self.isEmailAvailable(control.value)),
        map(({status}) => status ? null : { EmailExists: { message }})
      )
    }
  }
}
