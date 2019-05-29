import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  AbstractTrainerComponent,
} from "../abstract"

import {
  genSVGRectangle,
} from "../../lib/svg"

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
export class QuestionTrainerComponent
extends AbstractTrainerComponent<IQuestionTrainerConfig, IQuestionTrainerResult> {

  isResultMode!: boolean

  matrix?: Array<IQuestionTrainerAnswer>
  matrixViewBox: string = "0 0 0 0"
  matrixWidth: number = 0
  matrixHeight: number = 0

  shapeWidth: number = 0
  shapeHeight: number = 0

  init() {
    this.isResultMode = false
    this.matrix = undefined

    if (this.config.items) {
      switch (this.config.itemsType) {
        case "image":
        case "icon":
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

    const columns = this.getCSSPropertyIntValue("--columns")
    const rows = Math.ceil(this.config.items.length / columns)
    const gap = this.getCSSPropertyIntValue("--gap")

    const imageSize = this.getCSSPropertyIntValue("--item-image-size")
    const imageMargin = this.getCSSPropertyIntValue("--item-image-margin")
    const strokeWidth = this.getCSSPropertyIntValue("--item-stroke-width")

    const boxSize = imageSize + imageMargin + strokeWidth * 2

    const width = boxSize * columns + gap * (columns + 1)
    const height = boxSize * rows + gap * (rows + 1)

    this.matrixViewBox = `0 0 ${width} ${height}`
    this.matrixWidth = width
    this.matrixHeight = height

    this.shapeWidth = imageSize
    this.shapeHeight = imageSize

    return this.config.items.map((item, i) => {
      const x = (boxSize + gap) * (i % columns) + gap
      const y = (boxSize + gap) * Math.floor(i/columns) + gap

      return {
        ...genSVGRectangle(x, y, boxSize, boxSize),
        data: this.config.itemsType === 'icon' ? `/icons/${item.data}.svg` : item.data,
        correct: !!item.correct,
      }
    })
  }

  private _getTextsMatrix(): Array<IQuestionTrainerAnswer> {
    if (this.config.items === undefined) {
      return []
    }

    const columns = this.getCSSPropertyIntValue("--text-columns")
    const rows = Math.ceil(this.config.items.length / columns)
    const gap = this.getCSSPropertyIntValue("--gap")

    const context = document.createElement("canvas").getContext("2d")
    if (context === null) {
      return []
    }
    context.font = "bold 18px sans-serif"
    const getTextWidth = (text: string) => context.measureText(text).width
    const maxTextWidth = Math.ceil(Math.max(...this.config.items.map(({data}) => getTextWidth(data))))

    const minBoxWidth = this.getCSSPropertyIntValue("--item-text-min-width")
    const boxPadding = this.getCSSPropertyIntValue("--item-text-padding")
    const strokeWidth = this.getCSSPropertyIntValue("--item-stroke-width")

    const boxWidth = Math.max(maxTextWidth + boxPadding * 2, minBoxWidth) + strokeWidth * 2
    const boxHeight = this.getCSSPropertyIntValue("--item-text-height") + strokeWidth * 2

    const width = boxWidth * columns + gap * (columns + 1)
    const height = boxHeight * rows + gap * (rows + 1)

    this.matrixViewBox = `0 0 ${width} ${height}`
    this.matrixWidth = width
    this.matrixHeight = height

    return this.config.items.map((item, i) => {
      const x = (boxWidth + gap) * (i % columns) + gap
      const y = (boxHeight + gap) * Math.floor(i/columns) + gap

      return {
        ...genSVGRectangle(x, y, boxWidth, boxHeight),
        data: item.data,
        correct: !!item.correct,
      }
    })
  }

  private _showResult() {
    this.setTimeout(0)
    this.isResultMode = true
  }

  timeout() {
    this.updateResult({ isTimeout: true })
    this._showResult()
  }

  onButtonTouch() {
    if (this.isResultMode) {
      this.finish()
      return
    }
    this._showResult()
  }

  onAnswerClick(item: IQuestionTrainerAnswer) {
    if (this.isResultMode) {
      return
    }

    item.isSelected = !item.isSelected

    if (!this.config.multiple) {
      this._showResult()
    }
  }
}