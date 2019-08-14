import { Injectable } from "@angular/core"
import { CanActivate, Router } from "@angular/router"

// import { of } from "rxjs"

@Injectable()
export class RootRoutingGuard implements CanActivate {
  constructor(private _router: Router) {}

  canActivate() {
    return this._router.navigated ? true : this._router.createUrlTree(["/"])
  }
}