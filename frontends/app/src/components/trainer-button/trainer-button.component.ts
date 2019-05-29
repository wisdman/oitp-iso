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

import { genRectangle, opsToPath } from "../../lib/svg/generator"

import { KeypadService } from "../../services"

@Component({
  selector: "trainer-button",
  templateUrl: "./trainer-button.component.html",
  styleUrls: [ "./trainer-button.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerButtonComponent implements OnInit, OnChanges, OnDestroy {

  isTouchDivice = "ontouchstart" in window || navigator.maxTouchPoints

  constructor(
    private _elRef:ElementRef<HTMLElement>,
    private _keypadService: KeypadService,
  ){}

  private _style = getComputedStyle(this._elRef.nativeElement)

  private _getCSSPropertyIntValue(property: string): number {
    const value = this._style.getPropertyValue(property)
    return Number.parseInt(value)
  }

  @Input()
  text: string = ""

  @Output("touch")
  touchValueChange = new EventEmitter()

  @Input("active")
  isActive: boolean = false

  matrixWidth: number = 0
  matrixHeight: number = 0

  get matrixViewBox(): string {
    return `0 0 ${this.matrixWidth || 0} ${this.matrixHeight || 0}`
  }

  item!: {
    data: string

    x: number,
    y: number,
    fillPath: string,
    path: string,
  }

  private _keypadSubscriber!: Subscription

  ngOnInit() {
    const context = document.createElement("canvas").getContext("2d")
    if (context === null) {
      return []
    }

    context.font = `${this._style.fontWeight} ${this._style.fontSize} ${this._style.fontFamily}`

    const textWidth = context.measureText(this.text).width

    const itemHeight = this._getCSSPropertyIntValue("--trainer-text-item-height");
    const itemPadding = this._getCSSPropertyIntValue("--item-padding");
    const textPadding = this._getCSSPropertyIntValue("--text-padding");

    const itemWidth = textPadding + textWidth + textPadding

    const width = itemPadding + itemWidth + itemPadding
    const height = itemPadding + itemHeight + itemPadding

    this.matrixWidth = width
    this.matrixHeight = height

    const sets = genRectangle(itemPadding, itemPadding, itemWidth, itemHeight, { fill: true })

    const pathSet = sets.find(set => set.type === "path")
    const path = pathSet && opsToPath(pathSet) || ""

    const fillPathSet = sets.find(set => set.type === "fillPath")
    const fillPath = fillPathSet && opsToPath(fillPathSet) || ""

    this.item = {
      data: this.text,
      x: itemPadding + itemWidth / 2 + 1,
      y: itemPadding + itemHeight / 2 + 2,
      path,
      fillPath,
    }

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
