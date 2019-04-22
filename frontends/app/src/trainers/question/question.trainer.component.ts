import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core"

import { DomSanitizer } from "@angular/platform-browser"

import { RoughGenerator } from "../../lib/rough/generator"

import {
  IQuestionTrainerConfig,
  IQuestionTrainerResult,
  IQuestionTrainerAnswer,
} from "./question.trainer.interfaces"

const BOX_SIZE = 100
const PADDING = 8
const GAP = 8
const SHAPE_SIZE = 80

const FONT = "bold 18px sans-serif"
const MIN_TEXT_WIDTH = 10

const BOX_MIN_WIDTH = 150
const BOX_HEIGHT = 48
const BOX_PADDING = 12

interface IPaletteItem extends IQuestionTrainerAnswer {
  x: number,
  y: number,
  fillPath: string,
  path: string,
}

@Component({
  selector: "trainer-question",
  templateUrl: "./question.trainer.component.html",
  styleUrls: [ "./question.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionTrainerComponent implements OnInit, OnChanges {
  @Input()
  config!: IQuestionTrainerConfig

  result: IQuestionTrainerResult = {
    id: "question",
    config: this.config,
    answers: [],
    success: 0,
    error: 0,
  }

  @Output("result")
  resultValueChange = new EventEmitter<IQuestionTrainerResult>()

  private _updateResult(result: Partial<IQuestionTrainerResult>) {
    this.result = {...this.result, config: this.config, ...result}
    this.resultValueChange.emit(this.result)
  }

  ngOnChanges(sc: SimpleChanges ) {
    if (sc.config !== undefined && !sc.config.firstChange) {
      this.ngOnInit()
    }
  }

  ngOnInit() {
    this.palette = undefined
    if (this.config.items !== undefined) {
      this.palette = this.config.items.map(item => ({...item,  x: 0, y: 0, fillPath: "", path: "" }) )

      if (this.config.type === "image") {
        this._initImagesPaletteLayout()
      }

       if (this.config.type === "text") {
        this._initTextPaletteLayout()
      }
    }

    this._updateResult({
      isFinish: false,
      success: 0,
      error: 0,
    })
  }

  constructor(
    private _sanitizer: DomSanitizer,
  ){}

  get body() {
    return this._sanitizer.bypassSecurityTrustHtml(this.config.body)
  }

  paletteWidth!: number
  paletteHeight!: number

  shapeWidth: number = SHAPE_SIZE
  shapeHeight: number = SHAPE_SIZE

  palette?: Array<IPaletteItem>

  get paletteViewBox() {
    return `0 0 ${this.paletteWidth} ${this.paletteHeight}`
  }

  private _initImagesPaletteLayout() {
    if (this.palette === undefined) {
      return
    }
    const length = Math.min(this.palette.length, 5)
    const height = Math.ceil(this.palette.length / 5)
    const paletteWidth = BOX_SIZE * length + GAP * (length - 1) + PADDING * 2
    const paletteHeight = BOX_SIZE * height + GAP * (height - 1) + PADDING * 2

    const svgGenerator = new RoughGenerator({}, { width: paletteWidth, height: paletteHeight } )

    this.palette = this.palette.map((item, i) => {
      const x = (BOX_SIZE + GAP) * (i % 5) + PADDING
      const y = (BOX_SIZE + GAP) * Math.floor(i/5) + PADDING

      const sets = svgGenerator
                    .rectangle(x, y, BOX_SIZE, BOX_SIZE, {
                        fill: "none",
                        fillStyle: "solid",
                        roughness: 1
                    }).sets

      const pathSet = sets.find(set => set.type === "path")
      item.path = pathSet && svgGenerator.opsToPath(pathSet) || ""

      const fillPathSet = sets.find(set => set.type === "fillPath")
      item.fillPath = fillPathSet && svgGenerator.opsToPath(fillPathSet) || ""

      item.x = x + (BOX_SIZE - SHAPE_SIZE) / 2
      item.y = y + (BOX_SIZE - SHAPE_SIZE) / 2

      return item
    })

    this.paletteWidth = paletteWidth
    this.paletteHeight = paletteHeight
  }

  private _initTextPaletteLayout() {
    if (this.palette === undefined) {
      return
    }

    let getTextWidth = (_: string) => MIN_TEXT_WIDTH

    const context = document.createElement("canvas").getContext("2d")
    if (context !== null) {
      context.font = FONT
      getTextWidth = (text: string) => context.measureText(text).width
    }

    const maxTextWidth = Math.ceil(
                           Math.max(
                            ...this.palette.map(item => getTextWidth(item.data))
                           )
                         )

    const length = this.palette.length

    const boxWidth = Math.max(maxTextWidth + BOX_PADDING * 2, BOX_MIN_WIDTH)
    const boxHeight = BOX_HEIGHT

    const paletteWidth = boxWidth * length + GAP * (length - 1) + PADDING * 2
    const paletteHeight = BOX_HEIGHT + PADDING * 2

    const svgGenerator = new RoughGenerator({}, { width: paletteWidth, height: paletteHeight } )

    this.palette = this.palette.map((item, i) => {
      const x = (boxWidth + GAP) * i + PADDING
      const y = PADDING

      const sets = svgGenerator
                    .rectangle(x, y, boxWidth, boxHeight, {
                        fill: "none",
                        fillStyle: "solid",
                        roughness: 1
                    }).sets

      const pathSet = sets.find(set => set.type === "path")
      item.path = pathSet && svgGenerator.opsToPath(pathSet) || ""

      const fillPathSet = sets.find(set => set.type === "fillPath")
      item.fillPath = fillPathSet && svgGenerator.opsToPath(fillPathSet) || ""

      item.x = PADDING + (boxWidth + GAP) * i + boxWidth / 2
      item.y = boxHeight / 2 + PADDING

      return item
    })

    this.shapeWidth = boxWidth
    this.shapeHeight = boxHeight

    this.paletteWidth = paletteWidth
    this.paletteHeight = paletteHeight
  }

  onButtonClick() {
    this._updateResult({
      isFinish: true,
    })
  }

  onAnswerClick(item: IQuestionTrainerAnswer) {
    item.isSelected = !item.isSelected

    if (!this.config.multiple && !this.config.button) {
      this._updateResult({
        isFinish: true,
      })
    }
  }
}
