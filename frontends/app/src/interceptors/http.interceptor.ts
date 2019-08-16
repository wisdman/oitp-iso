import { Injectable } from "@angular/core"
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Router } from "@angular/router"

import { empty, Observable, throwError } from "rxjs"
import { catchError } from "rxjs/operators"

import { ConfigService, TokenService, NotificationService } from "../services"

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {
  constructor(
    private _configService: ConfigService,
    private _notificationService: NotificationService,
    private _router: Router,
    private _tokenService: TokenService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown | null>> {
    let isExternalRequest: boolean | undefined
    [request, isExternalRequest] = this._configService.prepareRequest(request)

    if (isExternalRequest) return next.handle(request)

    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].includes(err.status)) {
        this._tokenService.token = ""
        this._router.navigateByUrl("/login")
        return empty()
      }
      if (err.status >= 500) {
        this._notificationService.httpError(err.status)
      }
      return throwError(err)
    }))
  }
}