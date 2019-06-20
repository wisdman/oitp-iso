import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  SVGShape,
  genSVGRectangle,
} from "../../lib/svg"

import { textSize } from "../../lib/util"

import { AbstractTrainerComponent } from "../abstract"

import {
  IWordsPairsTrainerConfig,
  IWordsPairsTrainerResult,
} from "./words-pairs.trainer.interfaces"

type IColumnType = "left" | "right"

interface IItem extends SVGShape {
  type: IColumnType
  data: string
  userData: string

  isSelected?: boolean
  isSuccess?: boolean
}

@Component({
  selector: "trainer-words-pairs",
  templateUrl: "./words-pairs.trainer.component.html",
  styleUrls: [ "./words-pairs.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsPairsTrainerComponent
extends AbstractTrainerComponent<IWordsPairsTrainerConfig, IWordsPairsTrainerResult> {

  private _prepareString(value: string): string {
    return value.toUpperCase()
                .replace(/[^0-9A-ZА-ЯЙЁ\s]+/ig,"")
                .replace(/\s+/, " ")
                .trim()
                .replace("Й", "И")
                .replace("Ё", "Е")
  }

  mode: "show" | "play" | "result" = "show"

  items!: Array<IItem>
  hiddenColumn!: IColumnType

  init() {
    this.hiddenColumn = Math.random() >= 0.5 ? "left" : "right"

    const {
      width: textWidth,
      height: textHeight,
    } = this.config.items.flat().reduce((max, text) => {
      const { width, height } = textSize(text, this.fontStyle)
      return {
        width: Math.max(max.width, width),
        height: Math.max(max.height, height),
      }
    }, { width: 0, height: 0 })

    const paddingTop    = this.getCSSPropertyIntValue("--padding-top")
    const paddingBottom = this.getCSSPropertyIntValue("--padding-bottom")
    const paddingLeft   = this.getCSSPropertyIntValue("--padding-left")
    const paddingRight  = this.getCSSPropertyIntValue("--padding-right")

    const padding = this.getCSSPropertyIntValue("--trainer-svg-padding")
    const gap = this.getCSSPropertyIntValue("--gap")

    const rows = this.config.items.length

    const width = paddingLeft + textWidth + paddingRight
    const height = paddingTop + textHeight + paddingBottom

    this.matrixWidth = padding
                     + width  * 2 + gap
                     + padding

    this.matrixHeight = padding
                      + height * rows + gap * (rows - 1)
                      + padding

    this.items = this.config.items.map(([left, right], i) => {
      const x1 = padding
      const x2 = padding + width + gap
      const y = padding + (height + gap) * i

      return [{
        ...genSVGRectangle(x1, y, width, height),
        type: "left" as IColumnType,
        data: left.toUpperCase(),
        userData: left.toUpperCase(),
      },{
        ...genSVGRectangle(x2, y, width, height),
        type: "right"  as IColumnType,
        data: right.toUpperCase(),
        userData: right.toUpperCase(),
      }]
    }).flat()

    this.mode = "show"
    this.setTimeout(this.config.showTimeLimit)
  }

  startPlay() {
    this.items = this.items.map(value => ({
      ...value,
      userData: value.type === this.hiddenColumn ? "" : value.userData,
    }))

    this.mode = "play"
    this.setTimeout(this.config.playTimeLimit)
    this.markForCheck()
  }

  showResult() {
    this.setTimeout(0)

    this.items.forEach(value =>
      value.isSuccess = this._prepareString(value.data) === this._prepareString(value.userData)
    )

    this.mode = "result"
  }

  timeout() {
    switch (this.mode) {
      case "show":
        this.startPlay()
        return
      case "play":
        this.showResult()
        return
    }
  }
}
