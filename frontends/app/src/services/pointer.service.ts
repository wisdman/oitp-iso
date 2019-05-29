import { Injectable } from "@angular/core"

import {
  Subject,
  Observable,
} from "rxjs"

import {
  filter,
  share,
  withLatestFrom,
} from "rxjs/operators"

interface IEventData {
  type: "down" | "move" | "up"
  target: EventTarget | null
  x: number
  y: number
}

export type ISwipe = "UP" | "DOWN" | "LEFT" | "RIGHT"

const SWIPE_DELTA = 40

@Injectable({ providedIn: "root" })
export class PointerService {

  private _isPointerEvent = "PointerEvent" in window
  private _isTouchEvents = "ontouchstart" in window

  private _isScrollLocked: Subject<boolean> = new Subject<boolean>()
  lockScroll() {
    this._isScrollLocked.next(true)
  }
  unlockScroll() {
    this._isScrollLocked.next(false)
  }

  private _events: Subject<IEventData> = new Subject<IEventData>()
  private _onEvent(data: IEventData) {
    this._events.next(data)
  }

  events = this._events.pipe(share())

  pointerdown = this.events.pipe(filter(({type}) => type === "down"), share())
  pointermove = this.events.pipe(filter(({type}) => type === "move"), share())
  pointerup = this.events.pipe(filter(({type}) => type === "up"), share())

  swipe: Observable<ISwipe> = this.pointerup.pipe(
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
            filter((x: ISwipe | undefined): x is ISwipe => x !== undefined )
          )

  private _onPointerMoveListener!: (event: PointerEvent) => void
  private _onTouchMoveListener!: (event: TouchEvent) => void
  private _onMouseMoveListener!: (event: MouseEvent) => void

  private _initDownListeners() {
    document.addEventListener("pointerdown", event => {
      if (!event.isPrimary) {
        return
      }
      this._onEvent({
        type: "down",
        target: event.target,
        x: event.clientX,
        y: event.clientY,
      })
    }, { passive: false, capture: true })

    document.addEventListener("touchstart", event => {
      if (this._isPointerEvent) {
        return
      }
      if (event.changedTouches.length !== 1) {
        return
      }
      const touch = event.changedTouches[0]
      this._onEvent({
        type: "down",
        target: touch.target,
        x: touch.clientX,
        y: touch.clientY,
      })
    }, { passive: false, capture: true })

    document.addEventListener("mousedown", event => {
      if (this._isPointerEvent || this._isTouchEvents) {
        return
      }
      this._onEvent({
        type: "down",
        target: event.target,
        x: event.clientX,
        y: event.clientY,
      })
    }, { passive: false, capture: true })
  }

  private _initUpListeners() {
    document.addEventListener("pointerup", event => {
      if (!event.isPrimary) {
        return
      }
      this._onEvent({
        type: "up",
        target: event.target,
        x: event.clientX,
        y: event.clientY,
      })
    }, { passive: false, capture: true })

    document.addEventListener("touchend", event => {
      if (this._isPointerEvent) {
        return
      }
      if (event.changedTouches.length !== 1) {
        return
      }
      const touch = event.changedTouches[0]
      this._onEvent({
        type: "up",
        target: touch.target,
        x: touch.clientX,
        y: touch.clientY,
      })
    }, { passive: false, capture: true })

    document.addEventListener("mouseup", event => {
      if (this._isPointerEvent || this._isTouchEvents) {
        return
      }
      this._onEvent({
        type: "up",
        target: event.target,
        x: event.clientX,
        y: event.clientY,
      })
    }, { passive: false, capture: true })
  }

  private _initMoveListeners() {
    const self = this
    this._onPointerMoveListener = function(event: PointerEvent) {
      event.preventDefault()
      event.stopPropagation()
      if (!event.isPrimary) {
        return
      }
      self._onEvent({
        type: "move",
        target: event.target,
        x: event.clientX,
        y: event.clientY,
      })
    }

    this._onTouchMoveListener = function(event: TouchEvent) {
      event.preventDefault()
      event.stopPropagation()
      if (self._isPointerEvent) {
        return
      }
      if (event.changedTouches.length !== 1) {
        return
      }

      const touch = event.changedTouches[0]
      self._onEvent({
        type: "move",
        target: touch.target,
        x: touch.clientX,
        y: touch.clientY,
      })
    }

    this._onMouseMoveListener = function(event: MouseEvent) {
      event.preventDefault()
      event.stopPropagation()
      if (self._isPointerEvent || self._isTouchEvents) {
        return
      }
      self._onEvent({
        type: "move",
        target: event.target,
        x: event.clientX,
        y: event.clientY,
      })
    }
  }
  private _enableMoveListeners() {
    document.addEventListener("pointermove", this._onPointerMoveListener, { passive: false, capture: true })
    document.addEventListener("touchmove", this._onTouchMoveListener, { passive: false, capture: true })
    document.addEventListener("mousemove", this._onMouseMoveListener, { passive: false, capture: true })
  }

  private _disableMoveListeners() {
    document.removeEventListener("pointermove", this._onPointerMoveListener, { capture: true })
    document.removeEventListener("touchmove", this._onTouchMoveListener, { capture: true })
    document.removeEventListener("mousemove", this._onMouseMoveListener, { capture: true })
  }

  private _initScrollSubscriber() {
    this._isScrollLocked.subscribe( isScrollLocked => {
      if (isScrollLocked) {
        document.documentElement.classList.add("touch-action-none")
        this._enableMoveListeners()
        this._updateHeight()
      } else {
        this._disableMoveListeners()
        document.documentElement.classList.remove("touch-action-none")
        this._updateHeight()
      }
    })
  }

  private _updateHeight() {
    window.requestAnimationFrame(() => {
      document.documentElement.style.setProperty("--body-scroll-top", `${document.body.scrollTop}`)
      document.documentElement.style.setProperty("--window-height", `${window.innerHeight}`)
    })
  }

  private _initHeightDetection() {
    window.addEventListener("resize", () => this._updateHeight(), { passive: false, capture: true })
    window.addEventListener("deviceorientation", () => this._updateHeight(), { passive: false, capture: true })
  }

  load(): Promise<void> {
    // Pointer Events
    this._initDownListeners()
    this._initMoveListeners()
    this._initUpListeners()
    this._initScrollSubscriber()

    // Rwal window height
    this._initHeightDetection()
    this._updateHeight()

    return Promise.resolve()
  }
}

export function PointerServiceFactory(pointerService: PointerService): Function {
  return () => pointerService.load()
}