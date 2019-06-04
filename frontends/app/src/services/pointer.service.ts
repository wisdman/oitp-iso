import { Injectable } from "@angular/core"

import {
  fromEvent,
  merge,
  Observable,
} from "rxjs"

import {
  filter,
  map,
  share,
  withLatestFrom,
} from "rxjs/operators"

import { FullscreenService } from "./fullscreen.service"

export interface IPointerEvent {
  target: EventTarget | null
  x: number
  y: number
  originalEvent: PointerEvent | TouchEvent | MouseEvent
}

export type ISwipe = "UP" | "DOWN" | "LEFT" | "RIGHT"

const SWIPE_DELTA = 40

@Injectable({ providedIn: "root" })
export class PointerService {

  constructor(
    private _fullscreenService: FullscreenService
  ) {}


  // === Browsr supports ===

  readonly supports = {
    isPointerEvents: "PointerEvent" in window,
    isTouchEvents: "ontouchstart" in window
  }


  // === Pointer Up Observable ===

  private _pointerdown: Observable<IPointerEvent> =
    fromEvent<PointerEvent>(document, "pointerdown", {
      passive: false,
      capture: true,
    }).pipe(
      filter(event => event.isPrimary),
      map(event => {
        return {
          target: event.target,
          x: event.clientX,
          y: event.clientY,
          originalEvent: event,
        }
      })
    )

  private _touchstart: Observable<IPointerEvent> =
    fromEvent<TouchEvent>(document, "touchstart", {
      passive: false,
      capture: true,
    }).pipe(
      filter(event => !this.supports.isPointerEvents && event.changedTouches.length === 1),
      map(event => {
        const touch = event.changedTouches[0]
        return {
          target: touch.target,
          x: touch.clientX,
          y: touch.clientY,
          originalEvent: event,
        }
      })
    )

  private _mousedown: Observable<IPointerEvent> =
    fromEvent<MouseEvent>(document, "touchstart", {
      passive: false,
      capture: true,
    }).pipe(
      filter(() => !this.supports.isPointerEvents && !this.supports.isTouchEvents),
      map(event => {
        return {
          target: event.target,
          x: event.clientX,
          y: event.clientY,
          originalEvent: event,
        }
      })
    )

  pointerdown = merge(this._pointerdown, this._touchstart, this._mousedown)
                .pipe(share())


  // === Pointer Down Observable ===

  private _pointerup: Observable<IPointerEvent> =
    fromEvent<PointerEvent>(document, "pointerup", {
      passive: false,
      capture: true,
    }).pipe(
      filter(event => event.isPrimary),
      map(event => {
        return {
          target: event.target,
          x: event.clientX,
          y: event.clientY,
          originalEvent: event,
        }
      })
    )

  private _touchend: Observable<IPointerEvent> =
    fromEvent<TouchEvent>(document, "touchend", {
      passive: false,
      capture: true,
    }).pipe(
      filter(event => !this.supports.isPointerEvents && event.changedTouches.length === 1),
      map(event => {
        const touch = event.changedTouches[0]
        return {
          target: touch.target,
          x: touch.clientX,
          y: touch.clientY,
          originalEvent: event,
        }
      })
    )

  private _mouseup: Observable<IPointerEvent> =
    fromEvent<MouseEvent>(document, "mouseup", {
      passive: false,
      capture: true,
    }).pipe(
      filter(() => !this.supports.isPointerEvents && !this.supports.isTouchEvents),
      map(event => {
        return {
          target: event.target,
          x: event.clientX,
          y: event.clientY,
          originalEvent: event,
        }
      })
    )

  pointerup = merge(this._pointerup, this._touchend, this._mouseup)
              .pipe(share())


  // === Pointer Move Observable ===

  private _pointermove: Observable<IPointerEvent> =
    fromEvent<PointerEvent>(document, "pointermove", {
      passive: false,
      capture: true,
    }).pipe(
      filter(event => event.isPrimary),
      map(event => {
        return {
          target: event.target,
          x: event.clientX,
          y: event.clientY,
          originalEvent: event,
        }
      })
    )

  private _touchmove: Observable<IPointerEvent> =
    fromEvent<TouchEvent>(document, "touchmove", {
      passive: false,
      capture: true,
    }).pipe(
      filter(event => !this.supports.isPointerEvents && event.changedTouches.length === 1),
      map(event => {
        const touch = event.changedTouches[0]
        return {
          target: touch.target,
          x: touch.clientX,
          y: touch.clientY,
          originalEvent: event,
        }
      })
    )

  private _mousemove: Observable<IPointerEvent> =
    fromEvent<MouseEvent>(document, "mousemove", {
      passive: false,
      capture: true,
    }).pipe(
      filter(() => !this.supports.isPointerEvents && !this.supports.isTouchEvents),
      map(event => {
        return {
          target: event.target,
          x: event.clientX,
          y: event.clientY,
          originalEvent: event,
        }
      })
    )

  pointermove = merge(this._pointermove, this._touchmove, this._mousemove)
              .pipe(share())


  // === Swipe Observable ===

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


  // === Lock Move ===

  private _initMoveLocker() {
    this.pointermove.pipe(
      withLatestFrom(this._fullscreenService.locked)
    ).subscribe(([{ originalEvent }, locked]) => {
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
