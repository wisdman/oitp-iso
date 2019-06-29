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

  isSelected?: boolean
  isSuccess?: boolean
}

@Component({
  selector: "trainer-words-column",
  templateUrl: "./words-column.trainer.component.html",
  styleUrls: [ "./words-column.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsColumnTrainerComponent
extends AbstractTrainerComponent<IWordsColumnTrainerConfig, IWordsColumnTrainerResult> {

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

  init() {
    this.fullscreenService.unlock()

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
        userData: data.toUpperCase(),
      }
    })

    this.mode = "show"
    this.setTimeout(this.config.showTimeLimit)
  }

  startPlay() {
    this.mode = "play"

    this.items = this.items.map(value => ({...value, userData: "" }))

    this.setTimeout(this.config.playTimeLimit)
    this.markForCheck()
  }

  showResult() {
    this.setTimeout(0)

    this.items.forEach(value =>
      value.isSuccess = this._prepareString(value.data) === this._prepareString(value.userData)
    )

    this.mode = "result"
    this.markForCheck()
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

  finish() {
    const success = this.items.reduce((acc, {isSuccess}) => isSuccess ? ++acc : acc, 0)
    const result = Math.round(success / this.items.length * 100)
    this.updateResult({ result })
    super.finish()
  }
}
