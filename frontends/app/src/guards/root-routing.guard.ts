import { Injectable } from "@angular/core"
import { CanActivate, Router } from "@angular/router"

import { Observable, of } from "rxjs"

@Injectable()
export class RootRoutingGuard implements CanActivate {
  constructor( private _router: Router ) {}

  canActivate(): Observable<boolean> {
    if (!this._router.navigated) {
      this._router.navigateByUrl("/")
      return of(true)
    }

    return of(true)
  }
}