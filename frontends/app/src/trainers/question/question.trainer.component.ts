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

import { DomSanitizer } from "@angular/platform-browser"

import { RoughGenerator } from "../../lib/rough/generator"

import {
  LapTimerService,
} from "../../services"

import {
  IQuestionTrainerConfig,
  IQuestionTrainerResult,
  IQuestionTrainerAnswer,
} from "./question.trainer.interfaces"

@Component({
  selector: "trainer-question",
  templateUrl: "./question.trainer.component.html",
  styleUrls: [ "./question.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionTrainerComponent implements OnInit, OnChanges {
  constructor(
    private _lapTimerService: LapTimerService,
    private _sanitizer: DomSanitizer,
    private _elRef:ElementRef<HTMLElement>,
  ){}

  private _style = getComputedStyle(this._elRef.nativeElement)

  private _getCSSPropertyIntValue(property: string): number {
    const value = this._style.getPropertyValue(property)
    return Number.parseInt(value)
  }

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
    this._init()
    this._updateResult({
      isFinish: false,
      success: 0,
      error: 0,
    })
    this._lapTimerService.setLapTimeout(this.config.timeLimit || 0)
  }

  htmlSanitize(value: string) {
    return this._sanitizer.bypassSecurityTrustHtml(value)
  }

  matrix?: Array<IQuestionTrainerAnswer>
  matrixViewBox: string = "0 0 0 0"
  matrixWidth: number = 0
  matrixHeight: number = 0

  shapeWidth: number = 0
  shapeHeight: number = 0

  private _init() {
    this.matrix = undefined

    if (this.config.items) {
      switch (this.config.itemsType) {
        case "image":
          this.matrix = this._getImagesMatrix()
          break

        case "text":
          this.matrix = this._getTextsMatrix()
          break
      }
    }
  }

  private _getImagesMatrix(): Array<IQuestionTrainerAnswer> {
    if (this.config.items === undefined) {
      return []
    }

    const columns = this._getCSSPropertyIntValue("--columns")
    const rows = Math.ceil(this.config.items.length / columns)
    const gap = this._getCSSPropertyIntValue("--gap")

    const imageSize = this._getCSSPropertyIntValue("--item-image-size")
    const imageMargin = this._getCSSPropertyIntValue("--item-image-margin")
    const strokeWidth = this._getCSSPropertyIntValue("--item-stroke-width")

    const boxSize = imageSize + imageMargin + strokeWidth * 2

    const width = boxSize * columns + gap * (columns + 1)
    const height = boxSize * rows + gap * (rows + 1)

    this.matrixViewBox = `0 0 ${width} ${height}`
    this.matrixWidth = width
    this.matrixHeight = height

    this.shapeWidth = imageSize
    this.shapeHeight = imageSize

    const svgGenerator = new RoughGenerator({}, { width, height } )
    return this.config.items.map((item, i) => {
      const x = (boxSize + gap) * (i % columns) + gap
      const y = (boxSize + gap) * Math.floor(i/columns) + gap

      const sets = svgGenerator.rectangle(x, y, boxSize, boxSize, {
                                          fill: "none",
                                          fillStyle: "solid",
                                          roughness: 1,
                                        }).sets

      const pathSet = sets.find(set => set.type === "path")
      const path = pathSet && svgGenerator.opsToPath(pathSet) || ""

      const fillPathSet = sets.find(set => set.type === "fillPath")
      const fillPath = fillPathSet && svgGenerator.opsToPath(fillPathSet) || ""

      return {
        data: item.data,
        correct: !!item.correct,
        x: x + (boxSize - imageSize) / 2,
        y: y + (boxSize - imageSize) / 2,
        path,
        fillPath,
      }
    })
  }

  private _getTextsMatrix(): Array<IQuestionTrainerAnswer> {
    if (this.config.items === undefined) {
      return []
    }

    const columns = this._getCSSPropertyIntValue("--columns")
    const rows = Math.ceil(this.config.items.length / columns)
    const gap = this._getCSSPropertyIntValue("--gap")

    const context = document.createElement("canvas").getContext("2d")
    if (context === null) {
      return []
    }
    context.font = "bold 18px sans-serif"
    const getTextWidth = (text: string) => context.measureText(text).width
    const maxTextWidth = Math.ceil(Math.max(...this.config.items.map(({data}) => getTextWidth(data))))

    const minBoxWidth = this._getCSSPropertyIntValue("--item-text-min-width")
    const boxPadding = this._getCSSPropertyIntValue("--item-text-padding")
    const strokeWidth = this._getCSSPropertyIntValue("--item-stroke-width")

    const boxWidth = Math.max(maxTextWidth + boxPadding * 2, minBoxWidth) + strokeWidth * 2
    const boxHeight = this._getCSSPropertyIntValue("--item-text-height") + strokeWidth * 2

    const width = boxWidth * columns + gap * (columns + 1)
    const height = boxHeight * rows + gap * (rows + 1)

    this.matrixViewBox = `0 0 ${width} ${height}`
    this.matrixWidth = width
    this.matrixHeight = height

    const svgGenerator = new RoughGenerator({}, { width, height } )
    return this.config.items.map((item, i) => {
      const x = (boxWidth + gap) * (i % columns) + gap
      const y = (boxHeight + gap) * Math.floor(i/columns) + gap

      const sets = svgGenerator.rectangle(x, y, boxWidth, boxHeight, {
                                          fill: "none",
                                          fillStyle: "solid",
                                          roughness: 1,
                                        }).sets

      const pathSet = sets.find(set => set.type === "path")
      const path = pathSet && svgGenerator.opsToPath(pathSet) || ""

      const fillPathSet = sets.find(set => set.type === "fillPath")
      const fillPath = fillPathSet && svgGenerator.opsToPath(fillPathSet) || ""

       return {
        data: item.data,
        correct: !!item.correct,
        x: x + boxWidth - boxWidth / 2,
        y: y + boxHeight - boxHeight / 2,
        path,
        fillPath,
      }
    })
  }

  onButtonClick() {
    this._updateResult({
      isFinish: true,
    })
  }

  onAnswerClick(item: IQuestionTrainerAnswer) {
    item.isSelected = !item.isSelected

    if (!this.config.multiple) {
      this._updateResult({
        isFinish: true,
      })
    }
  }
}