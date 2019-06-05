import { Injectable } from "@angular/core"

import {
  filter,
  share,
  withLatestFrom,
} from "rxjs/operators"

import {
  initPointerDown,
  initPointerMove,
  initPointerUp,
  initPointerCancel,
} from "../lib/pointer-events"

import { FullscreenService } from "./fullscreen.service"

export type ISwipe = "UP" | "DOWN" | "LEFT" | "RIGHT"
const SWIPE_DELTA = 40

@Injectable({ providedIn: "root" })
export class PointerService {

  constructor(
    private _fullscreenService: FullscreenService
  ) {}

  pointerdown   = initPointerDown(document).pipe(share())
  pointermove   = initPointerMove(document).pipe(share())
  pointerup     = initPointerUp(document).pipe(share())
  pointercancel = initPointerCancel(document).pipe(share())

  swipe = this.pointerup.pipe(
    withLatestFrom(this.pointerdown, (up, down) => {
      const deltaX = down.x - up.x
      const deltaY = down.y - up.y

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > SWIPE_DELTA)
          return "LEFT"
        else if (deltaX < SWIPE_DELTA * -1)
          return "RIGHT"
      } else {
        if (deltaY > SWIPE_DELTA)
          return "UP"
        else if (deltaY < SWIPE_DELTA * -1)
          return "DOWN"
      }

      return undefined
    }),
    filter((x: ISwipe | undefined): x is ISwipe => x !== undefined),
    share(),
  )

  private _initMoveLocker() {
    this.pointermove.pipe(withLatestFrom(this._fullscreenService.locked))
    .subscribe(([{ originalEvent }, locked]) => {
      if (locked) {
        originalEvent.preventDefault()
        originalEvent.stopPropagation()
      }
    })
  }

  load(): Promise<void> {
    this._initMoveLocker()
    return Promise.resolve()
  }
}

export function PointerServiceFactory(pointerService: PointerService): Function {
  return () => pointerService.load()
}
