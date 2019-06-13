import { Injectable } from "@angular/core"
import { CanActivate, Router } from "@angular/router"

import { of } from "rxjs"

@Injectable()
export class RootRoutingGuard implements CanActivate {
  constructor( private _router: Router ) {}

  canActivate() {
    if (!this._router.navigated) {
      return this._router.createUrlTree(["/"])
    }

    return of(true)
  }
}