import { Injectable } from "@angular/core"
import { CanActivate } from "@angular/router"
import { HttpClient } from  "@angular/common/http"

import { Observable } from "rxjs"
import { map } from "rxjs/operators"

import { AUTH_BASE } from "../app.config"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _httpClient: HttpClient) {}

  canActivate(): Observable<boolean> {
    return this._httpClient.get(AUTH_BASE).pipe(map(()=>true))
  }
}