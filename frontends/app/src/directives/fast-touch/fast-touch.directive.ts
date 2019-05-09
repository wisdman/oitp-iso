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

const isPointerEvent = "PointerEvent" in window
const isTouchEvents = "ontouchstart" in window

const preventFunction = function(event: Event) {
  event.preventDefault()
  event.stopPropagation()
}

@Directive({
  selector: "[fastTouch]"
})
export class FastTouchDirective implements OnInit, OnDestroy {

  constructor(
    private _el: ElementRef<HTMLButtonElement>
  ) {}

  @Output("touch")
  touchValueChange = new EventEmitter<undefined>()

  private _getOnTouch() {
    const self = this
    return function(event: Event){
      event.preventDefault()
      event.stopPropagation()
      self.touchValueChange.emit(undefined)
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
    if (!isPointerEvent) {
      return
    }
    this._eventListeners.push(["pointerdown", this._getOnTouch()])
  }

  private _initTouchEvents() {
    if (!isTouchEvents) {
      return
    }

    if (isPointerEvent) {
      this._eventListeners.push(["touchstart", preventFunction])
      return
    }

    this._eventListeners.push(["touchstart", this._getOnTouch()])
  }

  private _initMouseEvents() {
    this._eventListeners.push(["click", preventFunction])

    if (isPointerEvent || isTouchEvents) {
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
