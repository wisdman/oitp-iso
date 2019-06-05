import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core"

import {
  merge,
  Subscription,
  Observable,
} from "rxjs"

import {
  distinctUntilChanged,
  map,
  share,
  switchMap,
  take,
  tap,
} from "rxjs/operators"

import {
  initPointerDown,
  initPointerUp,
  IPointerEvent,
} from "../../lib/pointer-events"

import { PointerService } from "../../services"

import { textSize } from "../../lib/util"

import {
  SVGShape,
  genSVGRectangle,
} from "../../lib/svg"

import { KeypadService } from "../../services"

@Component({
  selector: "trainer-button",
  templateUrl: "./trainer-button.component.html",
  styleUrls: [ "./trainer-button.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerButtonComponent implements OnInit, OnChanges, OnDestroy {

  constructor(
    private _elRef:ElementRef<HTMLElement>,
    private _keypadService: KeypadService,
    private _pointerService: PointerService,
  ){}

  item!: SVGShape & { data: string }

  private _style = getComputedStyle(this._elRef.nativeElement)
  private _getCSSPropertyIntValue(property: string): number {
    const value = this._style.getPropertyValue(property)
    return Number.parseInt(value)
  }

  matrixWidth: number = 0
  matrixHeight: number = 0
  get matrixViewBox(): string {
    return `0 0 ${this.matrixWidth || 0} ${this.matrixHeight || 0}`
  }

  private _renderShape(text: string): SVGShape {
    const {
      width: textWidth,
      height: textHeight,
    } = textSize(text, `${this._style.fontWeight} ${this._style.fontSize} ${this._style.fontFamily}`)

    const paddingTop    = this._getCSSPropertyIntValue("--padding-top")
    const paddingBottom = this._getCSSPropertyIntValue("--padding-bottom")
    const paddingLeft   = this._getCSSPropertyIntValue("--padding-left")
    const paddingRight  = this._getCSSPropertyIntValue("--padding-right")

    const svgPadding = this._getCSSPropertyIntValue("--trainer-svg-padding")

    const width = paddingLeft + textWidth + paddingRight
    const height = paddingTop + textHeight + paddingBottom

    this.matrixWidth = svgPadding + width + svgPadding
    this.matrixHeight = svgPadding + height + svgPadding

    return genSVGRectangle(svgPadding, svgPadding, width, height)
  }

  @Input()
  value: string = ""

  @Output("touch")
  touchChange: EventEmitter<IPointerEvent> = new EventEmitter<IPointerEvent>()

  @Input("focus")
  focus: boolean = false

  private _pointerDown = initPointerDown(this._elRef.nativeElement).pipe(
    tap(({originalEvent}) => {
      originalEvent.preventDefault()
      originalEvent.stopPropagation()
    }),
    share()
  )

  private _pointerUp = initPointerUp(this._elRef.nativeElement).pipe(
    tap(({originalEvent}) => {
      originalEvent.preventDefault()
      originalEvent.stopPropagation()
    }),
    share()
  )

  active:Observable<boolean> = merge(
    this._pointerDown.pipe(map(() => true)),
    this._pointerService.pointerup.pipe(map(() => false)),
    this._pointerService.pointercancel.pipe(map(() => false)),
  ).pipe(distinctUntilChanged())

  private _keypadSubscriber!: Subscription
  private _touchSubscriber!: Subscription

  ngOnInit() {
    const data = this.value.toLocaleUpperCase()
    this.item = {...this._renderShape(data), data}

    this._keypadSubscriber = merge(this._keypadService.enter, this._keypadService.space)
                              .subscribe(() => this.focus && this.touchChange.emit())

    this._touchSubscriber = this._pointerDown
                                .pipe(switchMap(() => this._pointerUp.pipe(take(1))))
                                .subscribe(event => this.touchChange.emit(event))
  }

  ngOnDestroy(){
    this._keypadSubscriber.unsubscribe()
    this._touchSubscriber.unsubscribe()
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.value !== undefined && !sc.value.firstChange) {
      this.ngOnInit()
    }
  }
}
