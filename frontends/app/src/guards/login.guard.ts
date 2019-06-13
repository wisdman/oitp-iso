import { Injectable } from "@angular/core"
import { CanActivate, Router } from "@angular/router"

import { of } from "rxjs"

import { TokenService } from "../services"

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private _tokenService: TokenService,
    private _router: Router,
  ) {}

  canActivate() {
    if (this._tokenService.token) {
      return this._router.createUrlTree(["/"])
    }

    return of(true)
  }

}