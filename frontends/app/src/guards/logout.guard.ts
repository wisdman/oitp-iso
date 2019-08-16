import { Injectable } from "@angular/core"
import { CanActivate, Router } from "@angular/router"
import { HttpClient } from  "@angular/common/http"

import { of }  from "rxjs"
import { catchError, map } from "rxjs/operators"

import { TokenService } from "../services"

const API_LOGOUT = "$API/self/logout"

@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(
    private _tokenService: TokenService,
    private _httpClient:HttpClient,
    private _router: Router,
  ) {}

  canActivate() {
    this._tokenService.token = ""
    return this._httpClient.get<void>(API_LOGOUT).pipe(
      catchError(() => of(undefined)),
      map(() => this._router.createUrlTree(["/login"]))
    )
  }
}
