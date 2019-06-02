import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core"

import { Subscription, merge } from "rxjs"

import {
  SVGRectangle,
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
  ){}

  private _style = getComputedStyle(this._elRef.nativeElement)

  private _getCSSPropertyIntValue(property: string): number {
    const value = this._style.getPropertyValue(property)
    return Number.parseInt(value)
  }

  private _getTextWidth(value: string): number {
    const context = document.createElement("canvas").getContext("2d")
    if (context === null) {
      return 0
    }
    context.font = `${this._style.fontWeight} ${this._style.fontSize} ${this._style.fontFamily}`
    return context.measureText(value).width
  }

  @Input()
  value: string = ""

  @Output("touch")
  touchValueChange = new EventEmitter()

  @Input("active")
  isActive: boolean = false

  matrixWidth: number = 0
  matrixHeight: number = 0
  get matrixViewBox(): string {
    return `0 0 ${this.matrixWidth || 0} ${this.matrixHeight || 0}`
  }

  item!: SVGRectangle & { data: string }

  private _keypadSubscriber!: Subscription

  ngOnInit() {
    const textWidth = this._getTextWidth(this.value)
    const textPadding = this._getCSSPropertyIntValue("--text-padding")

    const itemPadding = this._getCSSPropertyIntValue("--trainer-svg-padding")

    const itemWidth = textPadding + textWidth + textPadding
    const itemHeight = this._getCSSPropertyIntValue("--trainer-svg-height")

    this.matrixWidth = itemPadding + itemWidth + itemPadding
    this.matrixHeight = itemPadding + itemHeight + itemPadding

    this.item = {...genSVGRectangle(itemPadding, itemPadding, itemWidth, itemHeight), data: this.value}

    if (this._keypadSubscriber) this._keypadSubscriber.unsubscribe()
    this._keypadSubscriber = merge(this._keypadService.enter, this._keypadService.space)
                              .subscribe(() => this.isActive && this.onTouch())
  }

  ngOnDestroy(){
    if (this._keypadSubscriber) this._keypadSubscriber.unsubscribe()
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.text !== undefined && !sc.text.firstChange) {
      this.ngOnInit()
    }
  }

  onTouch() {
    this.touchValueChange.emit()
  }
}
