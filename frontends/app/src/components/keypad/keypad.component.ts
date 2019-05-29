import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  OnDestroy,
  OnInit,
} from "@angular/core"

import { Subscription } from "rxjs"

import {
  SVGRectangle,
  genSVGRectangle,
} from "../../lib/svg"

import {
  IKeypadType,
  KeypadService,
} from "../../services"

type IButtonConfig = [string, number]
type IKeypadConfig = Array<Array<IButtonConfig>>

const BACKSPACE = "⌫"
const ENTER = "⏎"
const SPACE = " "
const DASH = "—"

const CONFIGS: {
  RU: IKeypadConfig
  EN: IKeypadConfig
  NUMBERS: IKeypadConfig
} = {
  RU: [
    [["Й",1],["Ц",1],["У",1],["К",1],["Е",1],["Н",1],["Г",1],["Ш",1],["Щ",1],["З",1],["Х",1]],
    [["Ф",1],["Ы",1],["В",1],["А",1],["П",1],["Р",1],["О",1],["Л",1],["Д",1],["Ж",1],["Э",1]],
    [["Я",1],["Ч",1],["С",1],["М",1],["И",1],["Т",1],["Ь",1],["Б",1],["Ю",1],["Ъ",1],[BACKSPACE,1]],
    [[DASH,1],["!",1],[",",1],[SPACE,5],[".",1],[ENTER,2]],
  ],

  EN: [
    [["Q",1],["W",1],["E",1],["R",1],["T",1],["Y",1],["U",1],["I",1],["O",1],["P",1]],
    [["A",1],["S",1],["D",1],["F",1],["G",1],["H",1],["J",1],["K",1],["L",1]],
    [["Z",1],["X",1],["C",1],["V",1],["B",1],["N",1],["M",1],[",",1],[".",1],[BACKSPACE,1]],
    [[DASH,1],["!",1],[SPACE,6],[ENTER,2]],
  ],

  NUMBERS: [
    [["1",1],["2",1],["3",1]],
    [["4",1],["5",1],["6",1]],
    [["7",1],["8",1],["9",1]],
    [[".",1],["0",1],[BACKSPACE,1]],
  ]
}

@Component({
  selector: "keypad",
  templateUrl: "./keypad.component.html",
  styleUrls: [ "./keypad.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeypadComponent implements OnInit, OnDestroy {
  constructor(
    private _cdr: ChangeDetectorRef,
    private _elRef:ElementRef<HTMLElement>,
    private _keypadService: KeypadService,
  ){}

  private _style = getComputedStyle(this._elRef.nativeElement)

  private _getCSSPropertyIntValue(property: string): number {
    const value = this._style.getPropertyValue(property)
    return Number.parseInt(value)
  }

  matrix?: Array<SVGRectangle & { data: string }> = undefined

  matrixWidth: number = 0
  matrixHeight: number = 0

  get matrixViewBox(): string {
    return `0 0 ${this.matrixWidth || 0} ${this.matrixHeight || 0}`
  }

  private _lineCount(line: Array<IButtonConfig>): number {
    return line.reduce((sum, [_, x]) => sum + x, 0)
  }

  private _keypadSubscriber!: Subscription

  ngOnInit() {
    this._keypadSubscriber = this._keypadService
                                  .type
                                  .subscribe(type => {
                                    this.matrix = type && this._getMatrix(type) || undefined
                                    this._cdr.markForCheck()
                                  })
  }

  ngOnDestroy() {
    if (this._keypadSubscriber) this._keypadSubscriber.unsubscribe()
  }

  _getMatrix(type: IKeypadType) {
    const pads = CONFIGS[type]

    const linesCount = pads.length
    const maxLineCount = Math.max(...pads.map(line => this._lineCount(line)))

    const maxWidth = this._elRef.nativeElement.getBoundingClientRect().width

    const itemSize = this._getCSSPropertyIntValue("--trainer-svg-height");
    const itemWidth = Math.max(itemSize, Math.ceil(maxWidth / maxLineCount))
    const itemHeight = itemSize

    const padding = this._getCSSPropertyIntValue("--trainer-svg-padding")
    const gap = this._getCSSPropertyIntValue("--gap")

    const width = padding
                + itemWidth * maxLineCount + gap * (maxLineCount - 1)
                + padding
    const height = padding
                 + itemHeight * linesCount + gap * (linesCount - 1)
                 + padding

    this.matrixWidth = width
    this.matrixHeight = height

    return pads.map((line, i) => {
      const y = padding + itemHeight * i + gap * i
      const offsetXCount = maxLineCount - this._lineCount(line)
      let offsetX = padding + (itemWidth * offsetXCount + gap * offsetXCount) / 2
      return line.map(([data, length]) => {
        const currentItemWidth = itemWidth * length + gap * (length - 1)
        const x = offsetX
        offsetX += currentItemWidth + gap

        return {
          ...genSVGRectangle(x, y, currentItemWidth, itemHeight),
          data,
        }
      })
    }).flat()
  }

  onTouch(data: string) {
    switch (data) {
      case BACKSPACE:
        this._keypadService.emit("BACKSPACE")
        return

      case ENTER:
        this._keypadService.emit("ENTER")
        return

      case DASH :
        this._keypadService.emit("-")
        return

      default:
        this._keypadService.emit(data)
        return
    }
  }
}
