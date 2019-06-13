import { Injectable } from "@angular/core"
import { CanActivate, Router } from "@angular/router"

import { HttpClient } from  "@angular/common/http"

import { of }  from "rxjs"

import {
  catchError,
  map,
} from "rxjs/operators"

import { API_AUTH_LOGOUT } from "../app.config"

@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(
    private _httpClient:HttpClient,
    private _router: Router,
  ) {}

  canActivate() {
    return this._httpClient.delete<undefined>(API_AUTH_LOGOUT).pipe(
      catchError(() => of(undefined)),
      map(() => this._router.createUrlTree(["/login"]))
    )
  }
}
