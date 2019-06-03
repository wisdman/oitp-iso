import { Injectable } from "@angular/core"

import {
  BehaviorSubject,
  fromEvent,
  merge,
  of,
} from "rxjs"

import {
  share,
  withLatestFrom,
} from "rxjs/operators"

@Injectable({ providedIn: "root" })
export class FullscreenService {

  private _resetScroll() {
    document.body.scrollTop = 0
  }

  private _setCSSPropertyes() {
    document.documentElement.style.setProperty("--window-width", `${window.innerWidth}px`)
    document.documentElement.style.setProperty("--window-height", `${window.innerHeight}px`)
  }

  private _isLocked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  locked = this._isLocked.pipe(share())

  private _initResizeSubscribe() {
    this._isLocked.pipe(
      withLatestFrom(
        merge(of(undefined), fromEvent(window, "resize"), fromEvent(window, "deviceorientation"))
      ),
    ).subscribe(([locked]) => {
      locked && this._resetScroll()
      this._setCSSPropertyes()
    })
  }

  get isLocked() {
    return this._isLocked.getValue()
  }

  lock() {
    this._isLocked.next(true)
  }

  unlock() {
    this._isLocked.next(false)
  }

  load() {
    this._initResizeSubscribe()
    return Promise.resolve()
  }
}

export function FullscreenServiceFactory(fullscreenService: FullscreenService): Function {
  return () => fullscreenService.load()
}
