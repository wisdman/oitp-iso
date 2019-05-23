import { Injectable } from "@angular/core"
import { CanActivate } from "@angular/router"
// import { HttpClient } from  "@angular/common/http"

import { Observable, of } from "rxjs"
// import { map } from "rxjs/operators"

// import { API_USER } from "../app.config"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    // private _httpClient: HttpClient,
  ) {}

  canActivate(): Observable<boolean> {
    // this._httpClient.get(API_USER).pipe(map(()=>true))
    return of(true)
  }
}