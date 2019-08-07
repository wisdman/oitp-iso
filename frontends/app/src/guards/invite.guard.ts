import { Injectable } from "@angular/core"
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router"

import { of } from "rxjs"

import { tap } from "rxjs/operators"


import { UserService } from "../services"

@Injectable()
export class InviteGuard implements CanActivate {
  constructor(
    private _userService: UserService,
    private _router: Router,
  ) {}

  canActivate({params}: ActivatedRouteSnapshot) {
    if (params.id) {
      return this._userService.inviteLogin({id: params.id})
                              .pipe(tap(() => this._router.createUrlTree(["/"])))
    }
    return of(true)
  }

}
