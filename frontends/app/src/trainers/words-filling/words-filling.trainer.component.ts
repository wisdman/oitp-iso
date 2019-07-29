import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  SVGShape,
  genSVGRectangle,
} from "../../lib/svg"

import { AbstractTrainerComponent } from "../abstract"

import { IWordsFillingTrainerConfig } from "./words-filling.trainer.interfaces"

@Component({
  selector: "trainer-words-filling",
  templateUrl: "./words-filling.trainer.component.html",
  styleUrls: [ "./words-filling.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordsFillingTrainerComponent
extends AbstractTrainerComponent<IWordsFillingTrainerConfig> {

  private _prepareString(value: string): string {
    return value.toUpperCase()
                .replace("Й", "И")
                .replace("Ё", "Е")
                .replace(/[^0-9A-ZА-Я\s]+/ig,"")
                .replace(/\s+/ig, " ")
                .trim()

  }

  items!: Array<SVGShape & {
    rune: string
    word: string
    isSuccess?: boolean
  }>

  init() {
    this.fullscreenService.unlock()

    const svgSize = this.getCSSPropertyIntValue("--svg-size")
    this.matrixWidth = svgSize
    this.matrixHeight = svgSize

    this.items = this.config.runes.map(rune => ({
      ...genSVGRectangle(0, 0, svgSize, svgSize),
      rune: rune.toUpperCase(),
      word: "",
    }))
  }

  timeout() {
    this.result()
  }

  result() {
    super.result()
    this.items.forEach( (value, i, arr) => {
      const word = this._prepareString(value.word)
      const id = arr.findIndex(value => this._prepareString(value.word) === word)
      value.isSuccess = word[0] === value.rune && id === i
    })
    this.markForCheck()
  }

  finish() {
    const success = this.items.reduce((sum, {isSuccess}) => isSuccess ? ++sum : sum, 0)
    super.finish(success / this.config.runes.length * 100)
  }
}
