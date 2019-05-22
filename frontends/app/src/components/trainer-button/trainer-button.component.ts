import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core"

import { RoughGenerator } from "../../lib/rough/generator"

@Component({
  selector: "trainer-button",
  templateUrl: "./trainer-button.component.html",
  styleUrls: [ "./trainer-button.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainerButtonComponent implements OnInit, OnChanges {

  isTouchDivice = "ontouchstart" in window || navigator.maxTouchPoints

  constructor(
    private _elRef:ElementRef<HTMLElement>,
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

  ngOnInit() {
    const context = document.createElement("canvas").getContext("2d")
    if (context === null) {
      return []
    }
    context.font = `${this._style.fontWeight} ${this._style.fontSize} ${this._style.fontFamily}`

    const textWidth = context.measureText(this.text).width

    const itemHeight = this._getCSSPropertyIntValue("--item-height");
    const itemPadding = this._getCSSPropertyIntValue("--item-padding");
    const textPadding = this._getCSSPropertyIntValue("--text-padding");

    const itemWidth = textPadding + textWidth + textPadding

    const width = itemPadding + itemWidth + itemPadding
    const height = itemPadding + itemHeight + itemPadding

    this.matrixWidth = width
    this.matrixHeight = height

    const svgGenerator = new RoughGenerator({}, { width, height } )

    const sets = svgGenerator.rectangle(itemPadding, itemPadding, itemWidth, itemHeight, {
                                          fill: "none",
                                          fillStyle: "solid",
                                          roughness: 1,
                                        }).sets

    const pathSet = sets.find(set => set.type === "path")
    const path = pathSet && svgGenerator.opsToPath(pathSet) || ""

    const fillPathSet = sets.find(set => set.type === "fillPath")
    const fillPath = fillPathSet && svgGenerator.opsToPath(fillPathSet) || ""

    this.item = {
      data: this.text,
      x: itemPadding + itemWidth / 2 + 1,
      y: itemPadding + itemHeight / 2 + 2,
      path,
      fillPath,
    }
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
