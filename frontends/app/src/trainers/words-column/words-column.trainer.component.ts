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
  IWordsColumnTrainerConfig,
  IWordsColumnTrainerResult,
} from "./words-column.trainer.interfaces"

interface IItem extends SVGShape {
  data: string
  userData: string
}

@Component({
  selector: "trainer-words-column",
  templateUrl: "./words-column.trainer.component.html",
  styleUrls: [ "./words-column.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsColumnTrainerComponent
extends AbstractTrainerComponent<IWordsColumnTrainerConfig, IWordsColumnTrainerResult> {

  mode: "show" | "play" | "result" = "show"

  items!: Array<IItem>
  currentItem?: IItem

  init() {
    const width = this.getCSSPropertyIntValue("--column-width")
    const height = this.getCSSPropertyIntValue("--trainer-svg-height")
    const padding = this.getCSSPropertyIntValue("--trainer-svg-padding")
    const gap = this.getCSSPropertyIntValue("--gap")

    const rows = this.config.items.length

    this.matrixWidth = padding
                     + width
                     + padding

    this.matrixHeight = padding
                      + height * rows + gap * (rows - 1)
                      + padding

    this.items = this.config.items.map((data, i) => {
      const x = padding
      const y = padding + (height + gap) * i
      return {
        ...genSVGRectangle(x, y, width, height),
        data: data.toUpperCase(),
        userData: "",
      }
    })

    this.currentItem = undefined
    this.mode = "show"
    this.setTimeout(this.config.showTimeLimit)
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

  startPlay() {
    this.currentItem = this.items[0]
    this.mode = "play"
    this.setTimeout(this.config.playTimeLimit)
  }

  showResult() {
    this.setTimeout(0)
    this.currentItem = undefined
    this.mode = "result"
  }

  tab() {
    if (this.mode !== "play") {
      return
    }

    if (!this.currentItem) {
      this.currentItem = this.items[0]
      this.markForCheck()
      return
    }

    let idx = this.items.indexOf(this.currentItem) + 1

    if (idx >= this.items.length) {
      this.currentItem = undefined
    }

    this.currentItem = this.items[idx]
    this.markForCheck()
  }

  onTouch(item: IItem) {
    if (this.mode !== "play") {
      return
    }
    this.currentItem = item
  }

}
