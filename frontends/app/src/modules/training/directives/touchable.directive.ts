import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core"

import { Subscription } from "rxjs"

import { share, switchMap, take, tap } from "rxjs/operators"
import { initPointerDown, initPointerUp, IPointerEvent } from "../../libs/pointer-events"

@Directive({
  selector: "[touchable]"
})
export class TouchableDirective implements OnInit, OnDestroy {

  constructor(
    private _elRef: ElementRef<HTMLElement | SVGElement>,
  ) {}

  @Output("pointerDown")
  pointerDownChange: EventEmitter<IPointerEvent> = new EventEmitter<IPointerEvent>()

  @Output("pointerUp")
  pointerUpChange: EventEmitter<IPointerEvent> = new EventEmitter<IPointerEvent>()

  @Output("touch")
  touchChange: EventEmitter<IPointerEvent> = new EventEmitter<IPointerEvent>()

  @Input("stopPropagation")
  stopPropagation: boolean = false

  private _pointerDown = initPointerDown(this._elRef.nativeElement).pipe(
    tap(({originalEvent}) => {
      if (this.stopPropagation) {
        originalEvent.preventDefault()
        originalEvent.stopPropagation()
      }
    }),
    share()
  )

  private _pointerUp = initPointerUp(this._elRef.nativeElement).pipe(
    tap(({originalEvent}) => {
      if (this.stopPropagation) {
        originalEvent.preventDefault()
        originalEvent.stopPropagation()
      }
    }),
    share()
  )

  private _pointerDownSubscriber!: Subscription
  private _pointerUpSubscriber!: Subscription

  ngOnInit() {
    this._pointerDownSubscriber = this._pointerDown.subscribe(event => this.pointerDownChange.emit(event))

    this._pointerUpSubscriber = this._pointerDown
                                    .pipe(switchMap(() => this._pointerUp.pipe(take(1))))
                                    .subscribe(event => {
                                      this.pointerUpChange.emit(event)
                                      this.touchChange.emit(event)
                                    })
  }

  ngOnDestroy() {
    this._pointerDownSubscriber.unsubscribe()
    this._pointerUpSubscriber.unsubscribe()
  }
}
