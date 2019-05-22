import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core"

import { Subscription } from "rxjs"
import { TimerLapService } from "../../services"

import { RoughGenerator } from "../../lib/rough/generator"

import {
  IWordsColumnsTrainerConfig,
  IWordsColumnsTrainerResult,
  WordsColumnsTrainerID,
} from "./words-columns.trainer.interfaces"

interface IItem {
  data: string
  user: string

  column: number,

  x: number,
  y: number,
  fillPath: string,
  path: string,
}

@Component({
  selector: "trainer-words-columns",
  templateUrl: "./words-columns.trainer.component.html",
  styleUrls: [ "./words-columns.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsColumnsTrainerComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    private _cdr: ChangeDetectorRef,
    private _elRef:ElementRef<HTMLElement>,
    private _timerLapService: TimerLapService,
  ){}

  private _style = getComputedStyle(this._elRef.nativeElement)

  private _getCSSPropertyIntValue(property: string): number {
    const value = this._style.getPropertyValue(property)
    return Number.parseInt(value)
  }

  @Input()
  config!: IWordsColumnsTrainerConfig

  result: IWordsColumnsTrainerResult = {
    id: WordsColumnsTrainerID,
    config: this.config,
    success: 0,
    error: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<IWordsColumnsTrainerResult>()

  private _updateResult(result: Partial<IWordsColumnsTrainerResult>) {
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
    this._timerLapService.setTimeout(this.config.showTimeLimit)
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnDestroy() {
    if (this._lapTimerSubscriber) this._lapTimerSubscriber.unsubscribe()
  }

  mode: "show" | "play" | "result" = "show"

  matrixWidth: number = 0
  matrixHeight: number = 0

  get matrixViewBox(): string {
    return `0 0 ${this.matrixWidth || 0} ${this.matrixHeight || 0}`
  }

  items!: Array<IItem>
  currentItem?: IItem
  hiddenColumn!: number

  private _init() {
    this.mode = "show"
    this.hiddenColumn = -1

    const rowHeight = this._getCSSPropertyIntValue("--row-height");
    const columnWidth = this._getCSSPropertyIntValue("--column-width");
    const gap = this._getCSSPropertyIntValue("--gap");
    const padding = this._getCSSPropertyIntValue("--padding");

    const columns = this.config.items[0].length
    const rows = this.config.items.length

    const width = padding
                + columnWidth * columns + gap * (columns - 1)
                + padding

    const height = padding
                 + rowHeight * rows + gap * (rows - 1)
                 + padding

    this.matrixWidth = width
    this.matrixHeight = height

    const svgGenerator = new RoughGenerator({}, { width, height } )

    this.items = this.config.items.map((row, i) => {
      const y = padding + rowHeight * i + gap * i
      return row.map((data, j) => {
        const x = padding + columnWidth * j + gap * j

        const sets = svgGenerator.rectangle(x, y, columnWidth, rowHeight, {
                                          fill: "none",
                                          fillStyle: "solid",
                                          roughness: 1,
                                        }).sets

        const pathSet = sets.find(set => set.type === "path")
        const path = pathSet && svgGenerator.opsToPath(pathSet) || ""

        const fillPathSet = sets.find(set => set.type === "fillPath")
        const fillPath = fillPathSet && svgGenerator.opsToPath(fillPathSet) || ""

        data = data.toUpperCase()
        return {
          column: j,

          data: data,
          user: data,

          x: x + columnWidth / 2 + 1,
          y: y + rowHeight / 2 + 2,
          path,
          fillPath,
        }
      })
    }).flat()
  }

  private _play() {
    this.hiddenColumn = Math.floor(Math.random() * this.config.items[0].length)
    this.items.forEach(item => item.column === this.hiddenColumn ? item.user = "" : undefined)
    this.mode = "play"
    this._cdr.markForCheck()
    this._timerLapService.setTimeout(this.config.playTimeLimit)

    const item = this.items.find(item => item.column === this.hiddenColumn)
    if (!item) {
      return
    }

    this.currentItem = item
  }

  private _result() {
    this.mode = "result"
    this._cdr.markForCheck()
    this._timerLapService.setTimeout(0)
  }

  private _timeout() {
    if (this.mode === "play") {
      this._updateResult({ isTimeout: true })
      this._result()
      return
    }

    this._play()
  }

  onTouch(item: IItem) {
    if (item.column === this.hiddenColumn) {
      this.currentItem = item
    }
  }

  onKey(key: string) {
    if (!this.currentItem) {
      return
    }

    switch (key) {
      case "TAB":
      case "ENTER":
        for (let i = this.items.indexOf(this.currentItem) + 1; i < this.items.length; i++) {
          if (this.items[i].column === this.hiddenColumn) {
            this.currentItem = this.items[i]
            return
          }
        }

        const item = this.items.find(item => item.column === this.hiddenColumn)
        if (!item) {
          return
        }

        this.currentItem = item
        return

      case "BACKSPACE":
        this.currentItem.user = this.currentItem.data.slice(0,-1);
        return

      default:
        this.currentItem.user += key
        return
    }
  }

  onButtonTouch() {
    if (this.mode === "show") {
      this._play()
      return
    }

    if (this.mode === "play") {
      this._result()
      return
    }

    if (this.mode === "result") {
      this._updateResult({ isFinish: true })
      return
    }
  }

}
