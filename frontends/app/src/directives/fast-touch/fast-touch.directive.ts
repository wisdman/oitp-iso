import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core"

type IEvents = "pointerdown"
             | "touchstart"
             | "mousedown"
             | "click"

export interface ITouchData {
  target: EventTarget | null
  x: number
  y: number
}

@Directive({
  selector: "[fastTouch]"
})
export class FastTouchDirective implements OnInit, OnDestroy {

  private readonly _isPointerEvent = "PointerEvent" in window
  private readonly _isTouchEvents = "ontouchstart" in window

  constructor(
    private _el: ElementRef<HTMLButtonElement>
  ) {}

  @Output("touch")
  touchValueChange: EventEmitter<ITouchData> = new EventEmitter<ITouchData>()

  private _eventListeners!: Array<[IEvents, (event: Event) => void]>

  private _addEventListeners() {
    this._eventListeners.forEach(([evemtType, fn])=> {
      this._el.nativeElement.addEventListener(evemtType, fn, { passive: false, capture: true })
    })
  }

  private _removeEventListeners() {
    this._eventListeners.forEach(([evemtType, fn])=> {
      this._el.nativeElement.removeEventListener(evemtType, fn)
    })
  }

  private _initPointerEvents() {
    if (!this._isPointerEvent) {
      return
    }
    const self = this
    this._eventListeners.push(["pointerdown", function(event: PointerEvent){
      self.touchValueChange.emit({
        target: event.target,
        x: event.clientX,
        y: event.clientY,
      })
    } as (event: Event) => void])
  }

  private _initTouchEvents() {
    if (!this._isTouchEvents) {
      return
    }

    if (this._isPointerEvent) {
      return
    }

    const self = this
    this._eventListeners.push(["touchstart", function(event: TouchEvent){
      const touch = event.changedTouches[0]
      self.touchValueChange.emit({
        target: touch.target,
        x: touch.clientX,
        y: touch.clientY,
      })
    } as (event: Event) => void])
  }

  private _initMouseEvents() {
    this._eventListeners.push(["click", function(event: Event) {
      event.preventDefault()
      event.stopPropagation()
    }])

    if (this._isPointerEvent || this._isTouchEvents) {
      return
    }

    const self = this
    this._eventListeners.push(["mousedown", function(event: MouseEvent){
      self.touchValueChange.emit({
        target: event.target,
        x: event.clientX,
        y: event.clientY,
      })
    } as (event: Event) => void])
  }

  ngOnInit() {
    this._eventListeners = []
    this._initPointerEvents()
    this._initTouchEvents()
    this._initMouseEvents()
    this._addEventListeners()
  }

  ngOnDestroy() {
    this._removeEventListeners()
    this._eventListeners = []
  }
}
