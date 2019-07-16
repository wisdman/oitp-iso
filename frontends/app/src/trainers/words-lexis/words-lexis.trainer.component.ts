import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  genSVGEllipse,
  genSVGLine,
  genSVGRectangle,
  SVGShape,
} from "../../lib/svg"

import { textSize } from "../../lib/util"

import { AbstractTrainerComponent } from "../abstract"

import { IWordsLexisTrainerConfig } from "./words-lexis.trainer.interfaces"

interface IItem extends SVGShape {
  data: string
  type: "left" | "right"

  pair?: IItem
  userPair?: IItem

  isSelected?: boolean

  isError?: boolean
  isMark?: boolean
  isSuccess?: boolean

  ellipse: string
  line?: string
}

@Component({
  selector: "trainer-words-lexis",
  templateUrl: "./words-lexis.trainer.component.html",
  styleUrls: [ "./words-lexis.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsLexisTrainerComponent
extends AbstractTrainerComponent<IWordsLexisTrainerConfig> {

  mode: "play" | "result" = "play"

  items!: Array<IItem>

  init() {
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
    const columnGap = this.getCSSPropertyIntValue("--column-gap")
    const rowGap = this.getCSSPropertyIntValue("--row-gap")

    const rows = this.config.items.length

    const width = paddingLeft + textWidth + paddingRight
    const height = paddingTop + textHeight + paddingBottom

    this.matrixWidth = padding
                     + width + columnGap + width
                     + padding

    this.matrixHeight = padding
                      + height * rows + rowGap * (rows - 1)
                      + padding

    const left = this.config.items.map((_, i)=> {
      const x = padding
      const y = padding + (height + rowGap) * i

      const ellipse = genSVGEllipse(
                        x + width / 2,
                        y + height / 2,
                        width - Math.random() * width * 0.1 - padding,
                        height - Math.random() * height * 0.1 - padding,
                      )

      return {...genSVGRectangle(x, y, width, height), ellipse: ellipse.path}
    }).sort(() => Math.random() - 0.5)
      .sort(() => Math.random() - 0.5)

    const right = this.config.items.map((_, i)=> {
      const x = padding + width + columnGap
      const y = padding + (height + rowGap) * i

      const ellipse = genSVGEllipse(
                        x + width / 2,
                        y + height / 2,
                        width - Math.random() * width * 0.1 - padding,
                        height - Math.random() * height * 0.1 - padding,
                      )

      return {...genSVGRectangle(x, y, width, height), ellipse: ellipse.path}
    }).sort(() => Math.random() - 0.5)
      .sort(() => Math.random() - 0.5)

    this.items = this.config.items.map(([leftData, rightData])=> {
      let svgRectangle = left.pop()
      if (!svgRectangle) {
        throw "Incorrect left SVGRectangle"
      }

      const leftItem: IItem = {
        ...svgRectangle,
        data: leftData,
        type: "left",
      }

      svgRectangle = right.pop()
      if (!svgRectangle) {
        throw "Incorrect right SVGRectangle"
      }

      const rightItem: IItem = {
        ...svgRectangle,
        data: rightData,
        type: "right",
      }

      leftItem.pair = rightItem
      rightItem.pair = leftItem

      leftItem.line = genSVGLine(
                        leftItem.x + leftItem.width - paddingRight / 3 * 2,
                        leftItem.y + leftItem.height / 2,
                        rightItem.x + paddingLeft / 3 * 2,
                        rightItem.y + rightItem.height / 2,
                      ).path

      return [leftItem, rightItem]
    }).flat()
  }

  timeout() {
    super.timeout()
    this.result()
  }

  onTouch(item: IItem) {
    if (this.mode !== "play") {
      return
    }

    if (item.userPair) {
      return
    }

    const pair = this.items.find(value => !!value.isSelected && value.type !== item.type)
    if (pair !== undefined) {
      item.userPair = pair
      pair.userPair = item
    }

    this.items.forEach(value => {
      if (value.userPair) {
        value.isSelected = false
        return
      }

      if (value.type === item.type) {
        value.isSelected = value.isSelected && value === item ? false : (value === item)
      }
    })

    if (this.items.every(value => !!value.userPair)) {
      this.result()
      return
    }

    this.markForCheck()
  }

  finish() {
    const success = this.items.reduce((acc, {userPair, pair}) => userPair === pair ? ++acc : acc, 0)
    super.finish(success / this.items.length * 100)
  }
}
