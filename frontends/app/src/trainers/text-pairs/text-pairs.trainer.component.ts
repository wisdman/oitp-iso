import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  // HostListener,
} from "@angular/core"

import {
  ITextPairsItem,
  ITextPairsTrainerConfig,
  ITextPairsTrainerResult,
} from "./text-pairs.trainer.interfaces"

import { RoughGenerator } from "../../lib/rough/generator"

const FONT = "bold 18px sans-serif"
const MIN_TEXT_WIDTH = 10

const PADDING = 8
const ROW_GAP = 16
const COLUMNS_GAP = 16

const BOX_MIN_WIDTH = 150
const BOX_HEIGHT = 48
const BOX_PADDING = 12

@Component({
  selector: "trainer-text-pairs",
  templateUrl: "./text-pairs.trainer.component.html",
  styleUrls: [ "./text-pairs.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextPairsTrainerComponent implements OnInit, OnChanges {
  @Input()
  config!: ITextPairsTrainerConfig

  result: ITextPairsTrainerResult = {
    id: "text-pairs",
    config: this.config,
    success: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<ITextPairsTrainerResult>()

  private _updateResult(result: Partial<ITextPairsTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  svgWidth!: number
  svgHeight!: number

  get viewBox() {
    return `0 0 ${this.svgWidth} ${this.svgHeight}`
  }

  items!: Array<ITextPairsItem>

  ngOnInit() {
    [this.svgWidth, this.svgHeight, this.items] = this._InitTextPairsTrainerLayout(this._initItems(this.config.pairs))
    this._updateResult({
      isFinish: false,
      success: 0,
    })
  }

  private _initItems(pairs: Array<[string, string]>) {
    const [left, right] = pairs
                          .reduce(([left, right], [A, B]) => {
                            const itemA = {
                              companion: null as ITextPairsItem | null,
                              fillPath: "",
                              path: "",
                              side: "left",
                              text: A,
                              x: 0,
                              y: 0,
                            } as ITextPairsItem

                            const itemB = {
                              companion: null as ITextPairsItem | null,
                              fillPath: "",
                              path: "",
                              text: B,
                              x: 0,
                              y: 0,
                              side: "right",
                            } as ITextPairsItem

                            itemA.companion = itemB
                            itemB.companion = itemA

                            left.push(itemA)
                            right.push(itemB)
                            return [left, right]
                          }, [[] as Array<ITextPairsItem>, [] as Array<ITextPairsItem>])
                          .map(arr => arr.sort(() => Math.random() - 0.5))

    return left.map((A, i) => [A, right[i]]) as Array<[ITextPairsItem, ITextPairsItem]>
  }

  private _InitTextPairsTrainerLayout(
    pairs: Array<[ITextPairsItem, ITextPairsItem]>
  ): [number, number, Array<ITextPairsItem>] {
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

    const items: Array<ITextPairsItem> = pairs.map((row, i) => {
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

  left?: ITextPairsItem
  right?: ITextPairsItem

  pairs: Array<[ITextPairsItem, ITextPairsItem]> = []

  isSelected(item: ITextPairsItem) {
    switch (item.side) {
      case "left":
        return this.left === item
      case "right":
        return this.right === item
    }
    return false
  }

  onClick(item: ITextPairsItem) {
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
      isFinish: forceFinish || this.pairs.length === this.config.pairs.length
    })
  }
}
