import { Injectable } from "@angular/core"

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http"

import { Router } from "@angular/router"

import {
  empty,
  Observable,
} from "rxjs"

import { catchError } from "rxjs/operators"

import { AUTH_TOKEN_HEADER } from "../app.config"

import {
  NotificationService,
  TokenService,
} from "../services"

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {
  constructor(
    private _notificationService: NotificationService,
    private _router: Router,
    private _tokenService: TokenService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._tokenService.token

    if (!token) {
      this._router.navigateByUrl("/login")
      return empty()
    }

    request = request.clone({
      setHeaders: {
        [AUTH_TOKEN_HEADER]: token
      }
    })

    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this._tokenService.token = ""
        this._router.navigateByUrl("/login")
      } else {
        this._notificationService.httpError(err.status)
      }
      return empty()
    }))
  }
}