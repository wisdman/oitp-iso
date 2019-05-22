import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core"

import { RoughGenerator } from "../../lib/rough/generator"

const RU: Array<Array<string>> = [
  ["Й","Ц","У","К","Е","Н","Г","Ш","Щ","З","Х"],
  ["Ф","Ы","В","А","П","Р","О","Л","Д","Ж","Э"],
  ["Я","Ч","С","М","И","Т","Ь","Б","Ю","Ъ","Ё"],
]

const EN: Array<Array<string>> = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["Z","X","C","V","B","N","M"],
]

const ITEMS_RUNE = [...RU.flat(), ...EN.flat(), ".", ",", "-", " "]

const NUMBERS: Array<Array<string>> = [
  ["1","2","3"],
  ["4","5","6"],
  ["7","8","9"],
  [".","0","⇐"],
]

const ITEMS_NUMBERS = [...NUMBERS.flat()]

@Component({
  selector: "keypad",
  templateUrl: "./keypad.component.html",
  styleUrls: [ "./keypad.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeypadComponent implements OnInit, OnChanges {

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
  type: "ru" | "en" | "number" = "ru"

  @Input()
  force:boolean = false

  @Output("key")
  keyValueChange = new EventEmitter<string>()

  items: Array<string> = []

  matrix!: Array<{
    data: string

    x: number,
    y: number,
    fillPath: string,
    path: string,
  }>

  matrixWidth: number = 0
  matrixHeight: number = 0

  get matrixViewBox(): string {
    return `0 0 ${this.matrixWidth || 0} ${this.matrixHeight || 0}`
  }

  ngOnInit() {
    const pads = this.type === "ru" ? RU : this.type === "en" ? EN : NUMBERS
    this.items = this.type === "number" ? ITEMS_NUMBERS : ITEMS_RUNE

    const linesCount = pads.length
    const maxLineCount = Math.max(...pads.map(line => line.length))

    const maxWidth = this._elRef.nativeElement.getBoundingClientRect().width

    const itemSize = this._getCSSPropertyIntValue("--item-size");
    const itemWidth = Math.max(itemSize, Math.ceil(maxWidth / maxLineCount))
    const itemHeight = itemSize

    const padding = this._getCSSPropertyIntValue("--padding")
    const gap = this._getCSSPropertyIntValue("--gap")

    const width = padding
                + itemWidth * maxLineCount + gap * (maxLineCount - 1)
                + padding
    const height = padding
                 + itemHeight * linesCount + gap * (linesCount - 1)
                 + (this.type === "number" ? 0 : itemHeight + gap)
                 + padding

    this.matrixWidth = width
    this.matrixHeight = height

    const svgGenerator = new RoughGenerator({}, { width, height } )
    this.matrix = [
      ...pads.map((line, i) => {
        const y = padding + itemHeight * i + gap * i
        const offsetXCount = maxLineCount - line.length
        let offsetX = padding + (itemWidth * offsetXCount + gap * offsetXCount) / 2
        return line.map((data, j) => {
          const x = offsetX + itemWidth * j + gap * j
          const sets = svgGenerator.rectangle(x, y, itemWidth, itemHeight, {
                                              fill: "none",
                                              fillStyle: "solid",
                                              roughness: 1,
                                            }).sets

          const pathSet = sets.find(set => set.type === "path")
          const path = pathSet && svgGenerator.opsToPath(pathSet) || ""

          const fillPathSet = sets.find(set => set.type === "fillPath")
          const fillPath = fillPathSet && svgGenerator.opsToPath(fillPathSet) || ""

          return {
            data,
            x: x + itemWidth / 2 + 1,
            y: y + itemHeight / 2 + 2,
            path,
            fillPath,
          }
        })
      }).flat(),

      ...(()=>{
        if (this.type === "number") {
          return []
        }

        let offsetX: number = padding

        return [".", ",", "-", " ", "⇐"].map((data) => {
          const y = padding + itemHeight * linesCount + gap * linesCount
          const x = offsetX
          const specialWidth = (() => {
            switch (data) {
              case "⇐":
                return itemWidth * 2 + gap
              case " ":
                return itemWidth * (maxLineCount - 5) + gap * (maxLineCount - 6)
              default:
                return itemWidth
            }
          })()
          offsetX += specialWidth + gap

          const sets = svgGenerator.rectangle(x, y, specialWidth, itemHeight, {
                                                fill: "none",
                                                fillStyle: "solid",
                                                roughness: 1,
                                              }).sets

          const pathSet = sets.find(set => set.type === "path")
          const path = pathSet && svgGenerator.opsToPath(pathSet) || ""

          const fillPathSet = sets.find(set => set.type === "fillPath")
          const fillPath = fillPathSet && svgGenerator.opsToPath(fillPathSet) || ""

          return {
            data,
            x: x + specialWidth / 2 + 1,
            y: y + itemHeight / 2 + 2,
            path,
            fillPath,
            }
        })
      })()
    ]
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.type !== undefined && !sc.type.firstChange) {
      this.ngOnInit()
    }
  }

  onTouch(data: string) {
    switch (data) {
      case "⇐":
        this.keyValueChange.emit("BACKSPACE")
        return

      default:
        this.keyValueChange.emit(data)
        return
    }
  }

  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key.toUpperCase()
    switch (key) {
      case "BACKSPACE":
      case "TAB":
      case "ENTER":
        this.keyValueChange.emit(key)
        event.preventDefault()
        event.stopPropagation()
        return

      default:
        if (this.items.includes(key)) {
          this.keyValueChange.emit(key)
        }
        event.preventDefault()
        event.stopPropagation()
        return
    }
  }
}
