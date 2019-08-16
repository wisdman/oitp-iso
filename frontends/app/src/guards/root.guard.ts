import { Injectable } from "@angular/core"
import { CanActivate, Router } from "@angular/router"

@Injectable()
export class RootGuard implements CanActivate {
  constructor(private _router: Router) {}

  canActivate() {
    return this._router.navigated ? true : this._router.createUrlTree(["/"])
  }
}