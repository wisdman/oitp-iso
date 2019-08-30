import { Injectable } from "@angular/core"
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router"

import { of, Observable } from "rxjs"
import { map } from "rxjs/operators"

import { LoginService } from "../services"
import { NotificationService } from "../../../services"

const INVITE_ID_RX = /^[0-9a-f]{64}$/

@Injectable()
export class InviteGuard implements CanActivate {
  constructor(
    private _loginService: LoginService,
    private _notificationService: NotificationService,
    private _router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const inviteId = route.paramMap.get("id")
    if (!inviteId || !INVITE_ID_RX.test(inviteId)) {
      this._notificationService.error("Некоректная ссылка")
      this._router.navigateByUrl("/")
      return of(true)
    }
    return this._loginService.loginByInvite(inviteId).pipe(
      map(() => {
        this._router.navigateByUrl("/")
        return true
      })
    )
  }
}
