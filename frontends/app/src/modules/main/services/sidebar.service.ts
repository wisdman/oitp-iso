import { Injectable } from "@angular/core"
import { Router, NavigationStart } from "@angular/router"


import { BehaviorSubject, merge } from "rxjs"
import { distinctUntilChanged, shareReplay, filter, mapTo } from "rxjs/operators"

@Injectable()
export class SideBarService {
  constructor(
    private _router: Router
  ){}

  private _isOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  isOpen = merge(
    this._isOpen,
    this._router.events.pipe(filter(event => event instanceof NavigationStart), mapTo(false)),
  ).pipe(distinctUntilChanged(), shareReplay(1))

  open() {
    this._isOpen.next(true)
  }

  close() {
    this._isOpen.next(false)
  }
}
