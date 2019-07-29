import {
  ChangeDetectionStrategy,
  Component,
} from "@angular/core"

import { AbstractTrainerComponent } from "../abstract"

import { ITextLettersTrainerConfig } from "./text-letters.trainer.interfaces"

@Component({
  selector: "trainer-text-letters",
  templateUrl: "./text-letters.trainer.component.html",
  styleUrls: [ "./text-letters.trainer.component.css" ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextLettersTrainerComponent
  extends AbstractTrainerComponent<ITextLettersTrainerConfig> {

  runes!: Array<{
    data: string
    userData: string
  }>

  private _userData: string = ""
  get userData() {
    return this._userData
  }
  set userData(value: string) {
    this._userData = value
    this.runes = this.runes.map(({data}, i) => ({data, userData: (this._userData[i] || "").toUpperCase() }))
    if (this._userData.length >= this.runes.length) {
      this.result()
    }
  }

  init() {
    this.fullscreenService.unlock()

    this._userData = ""
    this.runes = this.config.runes.map(data =>({data, userData: ""}))
  }

  timeout() {
    this.result()
  }

  finish() {
    const success = this.runes.reduce((acc, {data, userData}) => data === userData ? ++acc : acc, 0)
    super.finish(success / this.runes.length * 100)
  }
}
