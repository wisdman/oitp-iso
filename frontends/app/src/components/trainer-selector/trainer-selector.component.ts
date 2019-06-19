import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core"

import {
  genSVGEllipse,
  genSVGRectangle,
  SVGShape,
} from "../../lib/svg"

export interface ISelectorItem {
  data: string
  isActive?: boolean
  isError?: boolean
  isMark?: boolean
  isSuccess?: boolean
}

@Component({
  selector: "trainer-selector",
  templateUrl: "./trainer-selector.component.html",
  styleUrls: [ "./trainer-selector.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainerSelectorComponent implements OnInit, OnChanges {

  constructor(
    private _cdr: ChangeDetectorRef,
    private _differs: KeyValueDiffers,
    private _elRef:ElementRef<HTMLElement>,
  ){}

  private _style = getComputedStyle(this._elRef.nativeElement)

  private _getCSSPropertyIntValue(property: string): number {
    const value = this._style.getPropertyValue(property)
    return Number.parseInt(value)
  }

  private _getTextWidth(value: Array<string>): Array<number> {
    const context = document.createElement("canvas").getContext("2d")
    if (context === null) {
      return []
    }

    context.font = `${this._style.fontWeight} ${this._style.fontSize} ${this._style.fontFamily}`
    return value.map(text => context.measureText(text).width)
  }

  matrixWidth: number = 0
  matrixHeight: number = 0
  get matrixViewBox(): string {
    return `0 0 ${this.matrixWidth || 0} ${this.matrixHeight || 0}`
  }

  @Input("type")
  type: "color" | "icon" | "text" = "text"

  @Input("readonly")
  readonly: boolean = false

  @Input("items")
  matrix!: Array<SVGShape & ISelectorItem & { ellipse: string }>

  @Output("touch")
  touchChange: EventEmitter<ISelectorItem> = new EventEmitter<ISelectorItem>()

  imageSize!: number

  private _itemsDiffer!: WeakMap<SVGShape & ISelectorItem, KeyValueDiffer<string, any>>

  ngOnInit() {
    this._itemsDiffer = new WeakMap<SVGShape & ISelectorItem, KeyValueDiffer<string, any>>()

    let itemWidth: number
    let itemHeight: number

    switch (this.type) {
      case "color":
        itemHeight = this._getCSSPropertyIntValue("--trainer-icon-size")
        itemWidth = itemHeight
        break

      case "icon":
        this.imageSize = this._getCSSPropertyIntValue("--trainer-icon-size")
        itemHeight = this._getCSSPropertyIntValue("--trainer-box-size")
        itemWidth = itemHeight
        break

      case "text":
        const maxTextWidth = Math.max(...this._getTextWidth(this.matrix.map(({data})=>data)))
        const textPadding = this._getCSSPropertyIntValue("--text-padding")

        itemWidth = textPadding + maxTextWidth + textPadding
        itemHeight = this._getCSSPropertyIntValue("--trainer-svg-height")
        break

      default:
        itemHeight = 0
        itemWidth = 0
        break
    }

    const padding = this._getCSSPropertyIntValue("--trainer-svg-padding")
    const gap = this._getCSSPropertyIntValue("--gap")

    const length = this.matrix.length
    const maxColumns = this._getCSSPropertyIntValue("--max-columns")

    const columns = (() =>{
      for (let i = maxColumns; i > 1; i--) {
        if (length % i === 0) return i
      }
      return maxColumns
    })()

    const rows = Math.ceil(length / columns)

    this.matrixWidth = itemWidth * columns
                     + gap * (columns - 1)
                     + padding * 2
    this.matrixHeight = itemHeight * rows
                      + gap * (rows - 1)
                      + padding * 2

    this.matrix.forEach((item, i) => {
      const x = padding + (itemWidth + gap) * (i % columns)
      const y = padding + (itemHeight + gap) * Math.floor(i/columns)
      const rectangle = genSVGRectangle(x, y, itemWidth, itemHeight)
      const ellipse = genSVGEllipse(
                        x + itemWidth / 2,
                        y + itemHeight / 2,
                        itemWidth - Math.random() * itemWidth * 0.1 - padding,
                        itemHeight - Math.random() * itemHeight * 0.1 - padding,
                      false)
      Object.assign(item, { ...rectangle, ellipse: ellipse.path } )
      this._itemsDiffer.set(item, this._differs.find(item).create<string, any>())
    })
  }

  ngOnChanges(sc: SimpleChanges) {
    if (sc.matrix && !sc.matrix.firstChange) {
      this.ngOnInit()
      this._cdr.markForCheck()
    }
  }

  ngDoCheck() {
    this.matrix.forEach(item => {
      const objectDiffer = this._itemsDiffer.get(item)
      if (objectDiffer === undefined) return
      const objChanges = objectDiffer.diff(item)
      if (objChanges) {
        this._cdr.markForCheck()
      }
    })
  }

  onTouch(item: ISelectorItem) {
    if (this.readonly) {
      return
    }
    item.isActive = !item.isActive
    this.touchChange.emit(item)
  }
}
