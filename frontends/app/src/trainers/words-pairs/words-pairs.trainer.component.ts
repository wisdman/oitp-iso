import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  HostListener,
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
  IWordsPairsItem,
  IWordsPairsTrainerConfig,
  IWordsPairsTrainerResult,
} from "./words-pairs.trainer.interfaces"

const FONT = "bold 18px sans-serif"
const MIN_TEXT_WIDTH = 10

const PADDING = 8
const ROW_GAP = 16
const COLUMNS_GAP = 16

const BOX_MIN_WIDTH = 150
const BOX_HEIGHT = 48
const BOX_PADDING = 12

@Component({
  selector: "trainer-words-pairs",
  templateUrl: "./words-pairs.trainer.component.html",
  styleUrls: [ "./words-pairs.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsPairsTrainerComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    private _timerLapService: TimerLapService,
  ){}

  @Input()
  config!: IWordsPairsTrainerConfig

  result: IWordsPairsTrainerResult = {
    id: "words-pairs",
    config: this.config,
    success: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<IWordsPairsTrainerResult>()

  private _updateResult(result: Partial<IWordsPairsTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  private _lapTimerSubscriber!: Subscription

  ngOnInit() {
    this._init()
    this._updateResult({
      isFinish: false,
      success: 0,
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

  private _init() {
    this.pairs = []
    const data = this._InitTextPairsTrainerLayout(this._initItems(this.config.items))
    this.svgWidth = data[0]
    this.svgHeight = data[1]
    this.items = data[2]
  }

  private _timeout() {
    this._updateResult({ isTimeout: true, isFinish: true })
  }

  svgWidth!: number
  svgHeight!: number

  get viewBox() {
    return `0 0 ${this.svgWidth} ${this.svgHeight}`
  }

  items!: Array<IWordsPairsItem>

  private _initItems(pairs: Array<[string, string]>) {
    let [left, right] = pairs
                          .reduce(([left, right], [A, B]) => {
                            const itemA = {
                              companion: null as IWordsPairsItem | null,
                              fillPath: "",
                              path: "",
                              side: "left",
                              text: A,
                              x: 0,
                              y: 0,
                            } as IWordsPairsItem

                            const itemB = {
                              companion: null as IWordsPairsItem | null,
                              fillPath: "",
                              path: "",
                              text: B,
                              x: 0,
                              y: 0,
                              side: "right",
                            } as IWordsPairsItem

                            itemA.companion = itemB
                            itemB.companion = itemA

                            left.push(itemA)
                            right.push(itemB)
                            return [left, right]
                          }, [[] as Array<IWordsPairsItem>, [] as Array<IWordsPairsItem>])

    if (this.config.mode !== "show") {
      left = left.sort(() => Math.random() - 0.5)
      right = right.sort(() => Math.random() - 0.5)
    }

    return left.map((A, i) => [A, right[i]]) as Array<[IWordsPairsItem, IWordsPairsItem]>
  }

  private _InitTextPairsTrainerLayout(
    pairs: Array<[IWordsPairsItem, IWordsPairsItem]>
  ): [number, number, Array<IWordsPairsItem>] {
    let getTextWidth = (_: string) => MIN_TEXT_WIDTH

    const context = document.createElement("canvas").getContext("2d")
    if (context !== null) {
      context.font = FONT
      getTextWidth = (text: string) => context.measureText(text).width
    }

    const maxTextWidth = Math.ceil(
                           Math.max(
                            ...pairs.map( row => row.map(item => getTextWidth(item.text) ) )
                                    .flat()
                           )
                         )

    const boxWidth = Math.max(maxTextWidth + BOX_PADDING * 2, BOX_MIN_WIDTH)
    const boxHeight = BOX_HEIGHT

    const svgWidth = boxWidth * 2 + COLUMNS_GAP + PADDING * 2
    const svgHeight = boxHeight * pairs.length + ROW_GAP * (pairs.length - 1) + PADDING * 2

    const svgGenerator = new RoughGenerator({}, { width: svgWidth, height: svgHeight } )

    const items: Array<IWordsPairsItem> = pairs.map((row, i) => {
      return row.map((item, j) => {
        const sets = svgGenerator
                      .rectangle(
                        PADDING + (boxWidth + COLUMNS_GAP) * j,
                        i * (boxHeight + ROW_GAP) + PADDING,
                        boxWidth,
                        boxHeight,
                        {
                          fill: "none",
                          fillStyle: "solid",
                          roughness: 1
                        }
                      ).sets

        const pathSet = sets.find(set => set.type === "path")
        item.path = pathSet && svgGenerator.opsToPath(pathSet) || ""

        const fillPathSet = sets.find(set => set.type === "fillPath")
        item.fillPath = fillPathSet && svgGenerator.opsToPath(fillPathSet) || ""

        item.x = PADDING + (boxWidth + COLUMNS_GAP) * j + boxWidth / 2
        item.y = i * (boxHeight + ROW_GAP) + PADDING + boxHeight / 2

        return item
      })
    }).flat()

    return [svgWidth, svgHeight, items]
  }

  left?: IWordsPairsItem
  right?: IWordsPairsItem

  pairs: Array<[IWordsPairsItem, IWordsPairsItem]> = []

  isSelected(item: IWordsPairsItem) {
    switch (item.side) {
      case "left":
        return this.left === item
      case "right":
        return this.right === item
    }
    return false
  }

  onClick(item: IWordsPairsItem) {
    if (this.config.mode === "show") {
      return
    }
    switch (item.side) {
      case "left":
        this.left = this.left === item ? undefined : item
        break;

      case "right":
        this.right = this.right === item ? undefined : item
        break;
    }

    if (this.left !== undefined && this.right !== undefined) {
      this.left.disabled = true
      this.right.disabled = true
      this.pairs.push([this.left, this.right])
      this.left = undefined
      this.right = undefined
      this._check()
    }
  }

  private _check(forceFinish: boolean = false) {
    this._updateResult({
      success: this.pairs.reduce((sum, [A, B]) => A.companion === B ? ++sum : sum, 0),
      isFinish: forceFinish || this.pairs.length === this.config.items.length
    })
  }

  @HostListener("click", ["$event"])
  onHostClick() {
    if (this.config.mode !== "show") {
      return
    }
    this._updateResult({ isFinish: true })
  }
}
