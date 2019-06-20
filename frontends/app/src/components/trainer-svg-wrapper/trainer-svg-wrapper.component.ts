import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core"

import {
  fromEvent,
  merge,
  of,
  Subscription,
} from "rxjs"

import { map } from "rxjs/operators"


import {
  SVGShape,
  genSVGRectangle,
} from "../../lib/svg"

const FOCUSABLE_TAGS = "input, select, textarea"

@Component({
  selector: "trainer-svg-wrapper",
  templateUrl: "./trainer-svg-wrapper.component.html",
  styleUrls: [ "./trainer-svg-wrapper.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerSVGWrapperComponent implements OnInit, OnDestroy {
  constructor(
    private _cdr: ChangeDetectorRef,
    private _elRef:ElementRef<HTMLElement>,
  ){}

  private _style = getComputedStyle(this._elRef.nativeElement)

  private _getCSSPropertyIntValue(property: string): number {
    const value = this._style.getPropertyValue(property)
    return Number.parseInt(value)
  }

  isFocused: boolean = false

  @Input("success")
  isSuccess: boolean = false

  @Input("error")
  isError: boolean = false

  matrixWidth: number = 0
  matrixHeight: number = 0

  get matrixViewBox(): string {
    return `0 0 ${this.matrixWidth || 0} ${this.matrixHeight || 0}`
  }

  matrix!:SVGShape

  private _focusSubscriber!: Subscription

  ngOnInit() {
    const padding = this._getCSSPropertyIntValue("--trainer-svg-padding");
    const {width, height} = this._elRef.nativeElement.getBoundingClientRect()

    this.matrixWidth = width
    this.matrixHeight = height

    this.matrix = genSVGRectangle(padding, padding, width - padding * 2, height - padding * 2)

    this._focusSubscriber = merge(
      of(false),
      ...Array.from(this._elRef.nativeElement.querySelectorAll(FOCUSABLE_TAGS))
              .map(node => [
                fromEvent(node,"focus").pipe(map(() => true)),
                fromEvent(node,"blur").pipe(map(() => false)),
              ]).flat()
    ).subscribe(isFocused => {
      this.isFocused = isFocused
      this._cdr.markForCheck()
    })
  }

  ngOnDestroy() {
    this._focusSubscriber.unsubscribe()
  }
}
