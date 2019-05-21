import { Injectable } from "@angular/core"
import { CanActivate, Router } from "@angular/router"

import { Observable, of } from "rxjs"

import { UserService } from "../services"

@Injectable()
export class LogoutGuard implements CanActivate {
  constructor(
    private _userService: UserService,
    private _router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    this._userService.logout().subscribe(() => this._router.navigate(["/login"]))
    return of(true)
  }
}