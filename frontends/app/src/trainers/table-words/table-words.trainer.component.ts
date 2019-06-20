import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  SVGShape,
  genSVGRectangle,
} from "../../lib/svg"

import { AbstractTrainerComponent } from "../abstract"

import {
  ITableWordsTrainerConfig,
  ITableWordsTrainerResult,
} from "./table-words.trainer.interfaces"

interface IItem extends SVGShape {
  data: string
  isSuccess?: boolean
  isSelected?: boolean
}

@Component({
  selector: "trainer-table-words",
  templateUrl: "./table-words.trainer.component.html",
  styleUrls: [ "./table-words.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableWordsTrainerComponent
extends AbstractTrainerComponent<ITableWordsTrainerConfig, ITableWordsTrainerResult> {

  mode: "play" | "result" = "play"

  headers!: Array<IItem>
  items!: Array<IItem>

  init() {
    const runeSize = this.getCSSPropertyIntValue("--trainer-svg-height")
    const columnWidth = this.getCSSPropertyIntValue("--column-width")
    const padding = this.getCSSPropertyIntValue("--trainer-svg-padding")
    const gap = this.getCSSPropertyIntValue("--gap")

    const rows = this.config.runes.length

    this.matrixWidth = padding
                     + runeSize
                     + gap
                     + columnWidth
                     + padding

    this.matrixHeight = padding
                      + runeSize
                      + runeSize * rows + gap * rows
                      + padding

    this.headers = this.config.runes.map((data, i) =>
      ({...genSVGRectangle(padding, padding + runeSize + (runeSize + gap) * i, runeSize, runeSize), data})
    )

    this.items = this.config.runes.map((_, i) => {
      const x = padding + runeSize + gap
      const y = padding + runeSize + (runeSize + gap) * i
      return {
        ...genSVGRectangle(x, y, columnWidth, runeSize),
        data: "",
      }
    })

    this.mode = "play"
    this.setTimeout(this.config.playTimeLimit)
  }

  timeout() {
    this.showResult()
  }

  showResult() {
    this.setTimeout(0)
    this.mode = "result"
  }

  finish() {
    super.finish()
  }
}
