import { Injectable } from "@angular/core"
import { CanActivate } from "@angular/router"
import { HttpClient } from  "@angular/common/http"

import { of }  from "rxjs"
import { catchError, mapTo } from "rxjs/operators"

import { API_AUTH } from "../app.config"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _httpClient: HttpClient) {}

  canActivate() {
    return this._httpClient.get<undefined>(API_AUTH).pipe(mapTo(true), catchError(() => of(false)))
  }
}