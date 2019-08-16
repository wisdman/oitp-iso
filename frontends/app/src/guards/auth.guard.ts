import { Injectable } from "@angular/core"
import { CanActivate } from "@angular/router"
import { HttpClient } from  "@angular/common/http"

import { of }  from "rxjs"
import { catchError, mapTo } from "rxjs/operators"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _httpClient: HttpClient) {}

  canActivate() {
    return this._httpClient.get<void>("$API/auth").pipe(
      mapTo(true),
      catchError(() => of(false))
    )
  }
}