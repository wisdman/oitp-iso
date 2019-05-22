import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ElementRef,
} from "@angular/core"

import { Subscription } from "rxjs"
import { TimerLapService } from "../../services"

import { RoughGenerator } from "../../lib/rough/generator"

import {
  ITableWordsTrainerConfig,
  ITableWordsTrainerResult,
  TableWordsTrainerID,
} from "./table-words.trainer.interfaces"

interface IItem {
  data: string

  x: number,
  y: number,
  fillPath: string,
  path: string,
}

type IActiveItem = IItem & {column: string}

@Component({
  selector: "trainer-table-words",
  templateUrl: "./table-words.trainer.component.html",
  styleUrls: [ "./table-words.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableWordsTrainerComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    private _elRef:ElementRef<HTMLElement>,
    private _timerLapService: TimerLapService,
  ){}

  private _style = getComputedStyle(this._elRef.nativeElement)

  private _getCSSPropertyIntValue(property: string): number {
    const value = this._style.getPropertyValue(property)
    return Number.parseInt(value)
  }

  @Input()
  config!: ITableWordsTrainerConfig

  result: ITableWordsTrainerResult = {
    id: TableWordsTrainerID,
    config: this.config,
    success: 0,
    error: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<ITableWordsTrainerResult>()

  private _updateResult(result: Partial<ITableWordsTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  private _lapTimerSubscriber!: Subscription

  ngOnInit() {
    this._init()
    this._updateResult({
      isFinish: false,
      success: 0,
      error: 0,
    })
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
    this._lapTimerSubscriber = this._timerLapService.timeout.subscribe(() => this._timeout())
    this._timerLapService.setTimeout(this.config.timeLimit)
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnDestroy() {
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
  }

  mode: "loading" | "play" | "result" = "play"

  matrixWidth: number = 0
  matrixHeight: number = 0

  get matrixViewBox(): string {
    return `0 0 ${this.matrixWidth || 0} ${this.matrixHeight || 0}`
  }

  headers!: Array<IItem>
  items!: Array<IActiveItem>
  currentItem?: IActiveItem

  private _init() {
    this.mode = "play"

    const runeSize = this._getCSSPropertyIntValue("--rune-size");
    const columnWidth = this._getCSSPropertyIntValue("--column-width");
    const gap = this._getCSSPropertyIntValue("--gap");
    const padding = this._getCSSPropertyIntValue("--padding");

    const columns = this.config.columns.length
    const rows = this.config.runes.length

    const width = padding
                + runeSize
                + columnWidth * columns + gap * columns
                + padding

    const height = padding
                 + runeSize
                 + runeSize * rows + gap * rows
                 + padding

    this.matrixWidth = width
    this.matrixHeight = height

    const svgGenerator = new RoughGenerator({}, { width, height } )

    this.headers = [
      ...["", ...this.config.runes].map((data, i) => {
        const x = padding
        const y = padding + runeSize * i + gap * i

        const sets = svgGenerator.rectangle(x, y, runeSize, runeSize, {
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
          x: x + runeSize / 2 + 1,
          y: y + runeSize / 2 + 2,
          path,
          fillPath,
        }
      }),

      ...this.config.columns.map((data, i) => {
        const x = padding + runeSize + columnWidth * i + gap * i
        const y = padding

        const sets = svgGenerator.rectangle(x, y, columnWidth, runeSize, {
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
          x: x + columnWidth / 2 + 1,
          y: y + runeSize / 2 + 2,
          path,
          fillPath,
        }
      }),
    ]

    this.items = this.config.columns.map((column, i) => {
      const x = padding + runeSize + columnWidth * i + gap * i
      return this.config.runes.map((_, j) => {
        const y = padding + runeSize + runeSize * j + gap * j

        const sets = svgGenerator.rectangle(x, y, columnWidth, runeSize, {
                                          fill: "none",
                                          fillStyle: "solid",
                                          roughness: 1,
                                        }).sets

        const pathSet = sets.find(set => set.type === "path")
        const path = pathSet && svgGenerator.opsToPath(pathSet) || ""

        const fillPathSet = sets.find(set => set.type === "fillPath")
        const fillPath = fillPathSet && svgGenerator.opsToPath(fillPathSet) || ""

        return {
          data: "",
          column,
          x: x + columnWidth / 2 + 1,
          y: y + runeSize / 2 + 2,
          path,
          fillPath,
        }
      })
    }).flat()

    this.currentItem = this.items.length > 0 ? this.items[0] : undefined
  }

  private _timeout() {
    this._updateResult({ isTimeout: true, isFinish: true })
  }

  onKey(key: string) {
    if (!this.currentItem) {
      return
    }

    switch (key) {
      case "BACKSPACE":
        this.currentItem.data = this.currentItem.data.slice(0,-1);
        return

      case "TAB":
      case "ENTER":
        if (this.items.length === 0) {
          return
        }

        let idx = this.items.indexOf(this.currentItem) + 1
        if (idx >= this.items.length) {
          idx = 0
        }
        this.currentItem = this.items[idx]
        return

      default:
        this.currentItem.data += key
        return
    }
  }

  onTouch(item: IActiveItem) {
    this.currentItem = item
  }

  onButtonTouch() {
    this._updateResult({ isFinish: true })
  }

}
