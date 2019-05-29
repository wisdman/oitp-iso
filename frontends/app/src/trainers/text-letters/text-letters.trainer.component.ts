import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import {
  AbstractTrainerComponent,
} from "../abstract"

import {
  ITextLettersTrainerConfig,
  ITextLettersTrainerResult,
} from "./text-letters.trainer.interfaces"

const RUNES = [
  ..."АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split(""),
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
]

@Component({
  selector: "trainer-text-letters",
  templateUrl: "./text-letters.trainer.component.html",
  styleUrls: [ "./text-letters.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextLettersTrainerComponent
extends AbstractTrainerComponent<ITextLettersTrainerConfig, ITextLettersTrainerResult> {

  mode: "show" | "play" | "result" = "show"

  data: string = ""
  runes: Array<{
    rune: string,
    user?: string,
  }> = []

  init() {
    this.mode = "show"
    this.data = this.config.data
    this.runes = this.data
                     .split(/\s/)
                     .map(word => word.slice(0,1).toUpperCase())
                     .filter(rune => RUNES.includes(rune))
                     .map(rune => ({rune}))
  }

  private _play() {
    this.mode = "play"
    this.markForCheck()
    this.setTimeout(this.config.playTimeLimit)
  }

  private _result() {
    this.mode = "result"
    this.markForCheck()
    this.setTimeout(0)
  }

  timeout() {
    if (this.mode === "play") {
      this.updateResult({ isTimeout: true })
      this._result()
      return
    }

    this._play()
  }

  private _step(rune: string) {
    const next = this.runes.find(item => !item.user)
    if (next === undefined) {
      this._result()
      return
    }

    next.user = rune

    const success =  this.runes.filter(({rune, user}) => rune === user).length
    const error = this.runes.length - success
    this.updateResult({ success, error })

    if (this.runes.every(({user}) => !!user)) {
      this._result()
    }
  }

  onKey(rune: string) {
    if (this.mode !== "play") {
      return
    }

    if (!RUNES.includes(rune)) {
      return
    }

    this._step(rune)
  }

  onButtonTouch() {
    if (this.mode === "result") {
      this.finish()
      return
    }

    this._play()
  }
}
