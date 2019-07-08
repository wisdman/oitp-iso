import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { AbstractTrainerComponent } from "../abstract"

import {
  ITextLettersTrainerConfig,
  ITextLettersTrainerResult,
} from "./text-letters.trainer.interfaces"

@Component({
  selector: "trainer-text-letters",
  templateUrl: "./text-letters.trainer.component.html",
  styleUrls: [ "./text-letters.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextLettersTrainerComponent
extends AbstractTrainerComponent<ITextLettersTrainerConfig, ITextLettersTrainerResult> {

  mode: "show" | "play" | "result" = "show"

  runes!: Array<{
    data: string
    userData: string
  }>

  private _getRunes(value: string): Array<string> {
    return value.toUpperCase()
                .replace(/[^0-9A-ZА-ЯЙЁ\s]+/ig,"")
                .replace(/\s+/, " ")
                .trim()
                .split(/\s+/)
                .map(s => s.charAt(0).toUpperCase())
  }



  private _userData: string = ""
  get userData() {
    return this._userData
  }
  set userData(value: string) {
    this._userData = value
    this.runes = this.runes.map(({data}, i) => ({data, userData: (this._userData[i] || "").toUpperCase() }))
    if (this._userData.length >= this.runes.length) {
      this.showResult()
    }
  }

  init() {
    this.fullscreenService.unlock()

    this._userData = ""
    this.runes = this._getRunes(this.config.data)
                     .map(data => ({data, userData:""}))

    this.mode = "show"
    this.setTimeout(this.config.showTimeLimit)
  }

  startPlay() {
    this.setTimeout(this.config.playTimeLimit)
    this.mode = "play"
    this.markForCheck()
    this.timeMeter()
  }

  showResult() {
    this.setTimeout(0)
    this.timeMeter()
    this.mode = "result"
    this.markForCheck()
  }

  finish() {
    const success = this.runes.reduce((acc, {data, userData}) => data === userData ? ++acc : acc, 0)
    const result = Math.round(success / this.runes.length * 100)
    this.updateResult({ result })
    super.finish()
  }

  timeout() {
    switch (this.mode) {
      case "show":
        this.startPlay()
        return
      case "play":
        super.timeout()
        this.showResult()
        return
    }
  }
}
