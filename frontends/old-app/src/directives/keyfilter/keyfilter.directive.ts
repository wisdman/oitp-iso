import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core"

import {
  BehaviorSubject,
  fromEvent,
  Subscription,
} from "rxjs"

import {
  filter,
  map,
  share,
  switchMap,
} from "rxjs/operators"

@Directive({
  selector: "[keyfilter]"
})
export class KeyFilterDirective implements OnInit, OnDestroy {

  constructor(
    private _elRef: ElementRef<HTMLInputElement | HTMLSelectElement>,
  ){}

  get _nativeElement(): HTMLInputElement | HTMLSelectElement {
    return this._elRef.nativeElement
  }

  private _keyDown = fromEvent<KeyboardEvent>(this._nativeElement, "keydown", { passive: false, capture: true }).pipe(
    map(event => {
      var key = event.key
      var keyUpperCase = key.toUpperCase()

      // Fix some key
      switch (keyUpperCase) {
        case "DOWN":
        case "ARROWDOWN":
          key = "DOWN"
          break

        case "UP":
        case "ARROWUP":
          key = "UP"
          break

        case "LEFT":
        case "ARROWLEFT":
          key = "LEFT"
          break

        case "RIGHT":
        case "ARROWRIGHT":
          key = "RIGHT"
          break

        case "ESC":
        case "ESCAPE":
          key = "ESCAPE"

        case "BACKSPACE":
        case "ENTER":
        case "TAB":
          key = keyUpperCase
      }

      return { event, key }
    }),
    share(),
  )

  private _filter: BehaviorSubject<RegExp | undefined> = new BehaviorSubject<RegExp | undefined>(undefined)

  @Input("keyfilter")
  set filter(value: string | undefined) {
    if (!value) {
      this._filter.next(undefined)
      return
    }
    this._filter.next(new RegExp(`[${value}]+`))
  }

  private _keyDownFilterSubscriber!: Subscription


  ngOnInit() {
    this._keyDownFilterSubscriber = this._filter.pipe(
      switchMap(rx =>
        this._keyDown.pipe(
          filter(() => !this._nativeElement.disabled),
          filter(({key}) => !["DOWN", "UP", "LEFT", "RIGHT", "ESC", "BACKSPACE", "ENTER", "TAB"].includes(key)),
          filter(({key}) => rx !== undefined && !rx.exec(key)),
        )
      )
    ).subscribe(({event}) => {
      event.preventDefault()
      event.stopPropagation()
    })
  }

  ngOnDestroy() {
    this._keyDownFilterSubscriber.unsubscribe()
  }
}