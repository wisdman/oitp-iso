import { Injectable } from "@angular/core"
import { CanActivate, Router } from "@angular/router"

import { Observable, of } from "rxjs"

@Injectable()
export class LogoutGuardService implements CanActivate {
  constructor(private _router: Router) {}

  canActivate(): Observable<boolean> {
    this._router.navigate(["/login"])
    return of(true)
  }
}