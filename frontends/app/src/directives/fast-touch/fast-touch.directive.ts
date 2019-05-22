import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter,
} from "@angular/core"

type IEvents = "pointerdown"
             | "touchstart"
             | "mousedown"
             | "click"

const preventFunction = function(event: Event) {
  event.preventDefault()
  event.stopPropagation()
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
  touchValueChange = new EventEmitter()

  private _getOnTouch() {
    const self = this
    return function(event: Event){
      event.preventDefault()
      event.stopPropagation()
      self.touchValueChange.emit()
    }
  }

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
    this._eventListeners.push(["pointerdown", this._getOnTouch()])
  }

  private _initTouchEvents() {
    if (!this._isTouchEvents) {
      return
    }

    if (this._isPointerEvent) {
      this._eventListeners.push(["touchstart", preventFunction])
      return
    }

    this._eventListeners.push(["touchstart", this._getOnTouch()])
  }

  private _initMouseEvents() {
    this._eventListeners.push(["click", preventFunction])

    if (this._isPointerEvent || this._isTouchEvents) {
      this._eventListeners.push(["mousedown", preventFunction])
      return
    }

    this._eventListeners.push(["mousedown", this._getOnTouch()])
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
